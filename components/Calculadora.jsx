"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  SMMLV,
  cop,
  liquidar,
  liquidarCotizante76,
  proyectarPension,
  SEMANAS_MINIMAS,
} from "@/lib/calculadora";
import WhatsAppButton from "@/components/WhatsAppButton";
import styles from "./Calculadora.module.css";

const TIPOS_COTIZANTE = [
  {
    value: "59",
    label: "Contratista — prestación de servicios (Tipo 59)",
    nota: "Contrato de prestación de servicios superior a 1 mes. Tú eliges qué incluir: Salud, Pensión, ARL y Caja.",
  },
  {
    value: "03",
    label: "Independiente por cuenta propia (Tipo 03)",
    nota: "Trabajas por cuenta propia. Incluye Salud y Pensión — este tipo no incluye ARL.",
  },
  {
    value: "57",
    label: "Solo ARL voluntaria (Tipo 57)",
    nota: "Ya cotizas Salud y Pensión por otro medio; aquí solo afilias tu ARL de forma voluntaria.",
  },
  {
    value: "73",
    label: "Interno de Medicina (Tipo 73)",
    nota: "IBC fijo de 1 SMMLV. Cotiza como independiente a Salud y Pensión.",
  },
  {
    value: "76",
    label: "Tiempo parcial — por días (Tipo 76)",
    nota: "Trabajador de tiempo parcial independiente — el IBC de Pensión y Caja se calcula por rango de días laborados en el mes, según la Resolución 1529 de 2026.",
  },
];

export default function Calculadora({
  defaultExterior = false,
  showModalidad = true,
  showPensionProjection = true,
  showAportes = true,
}) {
  const resultRef = useRef(null);
  const [resaltar, setResaltar] = useState(false);
  const [ingresos, setIngresos] = useState(SMMLV);
  const exterior = defaultExterior;
  const [tipoCotizante, setTipoCotizante] = useState("59");
  const [salud, setSalud] = useState(true);
  const [pension, setPension] = useState(true);
  const [arl, setArl] = useState(!defaultExterior);
  const [riesgo, setRiesgo] = useState("I");
  const [caja, setCaja] = useState(false);
  const [cajaRate, setCajaRate] = useState(0.02);

  const [dias, setDias] = useState("");
  const es59 = !exterior && tipoCotizante === "59";
  const es03 = !exterior && tipoCotizante === "03";
  const es57 = !exterior && tipoCotizante === "57";
  const es73 = !exterior && tipoCotizante === "73";
  const esDias76 = !exterior && tipoCotizante === "76";
  const tipoInfo = TIPOS_COTIZANTE.find((t) => t.value === tipoCotizante);

  const [sexo, setSexo] = useState("hombre");
  const [edadActual, setEdadActual] = useState("");
  const [semanasCotizadas, setSemanasCotizadas] = useState("");

  const [usdRate, setUsdRate] = useState(null);
  const [showUsd, setShowUsd] = useState(false);
  const [loadingUsd, setLoadingUsd] = useState(false);
  const [usdError, setUsdError] = useState("");

  // Tipos 03 y 73 siempre incluyen Salud+Pensión sin ARL; tipo 57 es solo ARL.
  // El tipo 59 (o exterior/completo) deja que el usuario elija con los checks.
  const effSalud = es03 || es73 ? true : es57 ? false : salud;
  const effPension = es03 || es73 ? true : es57 ? false : pension;
  const effArl = es57 ? true : es03 || es73 ? false : arl;
  const ingresosEfectivos = es73 ? SMMLV : ingresos;

  const opts = { exterior, salud: effSalud, pension: effPension, arl: effArl, riesgo, caja, cajaRate };
  const r = useMemo(
    () => liquidar(ingresosEfectivos, opts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ingresosEfectivos, exterior, effSalud, effPension, effArl, riesgo, caja, cajaRate]
  );
  const flooredMin = ingresosEfectivos * 0.4 < SMMLV;

  const diasNum = Math.min(30, Math.max(0, Number(dias) || 0));
  const r76 = useMemo(
    () => liquidarCotizante76({ dias: diasNum, riesgo, cajaRate, salud, pension, arl }),
    [diasNum, riesgo, cajaRate, salud, pension, arl]
  );

  const edadNum = Number(edadActual) || 0;
  const semanasNum = Number(semanasCotizadas) || 0;
  const datosPensionCompletos = edadNum > 0 && edadActual !== "" && semanasCotizadas !== "";

  const proyeccionMinimo = useMemo(
    () => proyectarPension({ sexo, edadActual: edadNum, semanasCotizadas: semanasNum, ibl: SMMLV }),
    [sexo, edadNum, semanasNum]
  );
  const ibcActual = esDias76 ? r76.ibc : r.ibc;
  const proyeccionIbc = useMemo(
    () => proyectarPension({ sexo, edadActual: edadNum, semanasCotizadas: semanasNum, ibl: ibcActual }),
    [sexo, edadNum, semanasNum, ibcActual]
  );

  function calcular() {
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setResaltar(true);
    setTimeout(() => setResaltar(false), 900);
  }

  async function toggleUsd() {
    if (showUsd) {
      setShowUsd(false);
      return;
    }
    if (usdRate) {
      setShowUsd(true);
      return;
    }
    setLoadingUsd(true);
    setUsdError("");
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      const rate = data?.rates?.COP;
      if (!rate) throw new Error("no rate");
      setUsdRate(rate);
      setShowUsd(true);
    } catch {
      setUsdError("No pudimos obtener la tasa de cambio. Intenta de nuevo.");
    } finally {
      setLoadingUsd(false);
    }
  }

  const usd = (cop_) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cop_);

  const cotizaMsg = esDias76
    ? `Hola ¡Afiliamos Ya!, soy cotizante 76 (tiempo parcial independiente). ` +
      `Trabajé ${diasNum} días este mes (ARL riesgo ${riesgo}). ` +
      `Autorizo que me contacten por este medio para mi cotización.`
    : `Hola ¡Afiliamos Ya!, quiero afiliarme a seguridad social como independiente (${tipoInfo.label}). ` +
      `Mis ingresos aprox. son ${cop(ingresosEfectivos)}/mes${effArl ? ` (ARL riesgo ${riesgo})` : ""}. ` +
      `Autorizo que me contacten por este medio para mi cotización.`;

  const pensionMsg =
    `Hola ¡Afiliamos Ya!, quiero asesoría sobre mi pensión. Tengo ${edadNum} años (${sexo}), ` +
    `${semanasNum} semanas cotizadas, y me faltarían ${proyeccionIbc.semanasRestantes} semanas más. ` +
    `Autorizo que me contacten por este medio.`;

  return (
    <>
    {showAportes && (
    <div className={styles.calc}>
      <div className={styles.inputs}>
        {showModalidad && (
          <>
            <label className={styles.label}>Modalidad</label>
            <div className={styles.modeBadge}>
              {exterior ? "Residente exterior" : "En Colombia"}
            </div>
            <div className={styles.note}>
              {exterior
                ? "El residente en el exterior solo puede aportar pensión (Decreto 682 de 2014)."
                : "Independiente que cotiza en Colombia."}
            </div>
          </>
        )}

        {!exterior && (
          <>
            <label className={styles.label}>Tipo de cotizante</label>
            <select
              className={styles.field}
              value={tipoCotizante}
              onChange={(e) => setTipoCotizante(e.target.value)}
            >
              {TIPOS_COTIZANTE.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <div className={styles.note}>{tipoInfo.nota}</div>
          </>
        )}

        {esDias76 ? (
          <>
            <label className={styles.label}>Días laborados en el mes</label>
            <input
              className={styles.field}
              type="text"
              inputMode="numeric"
              placeholder="Ej: 12"
              value={dias}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setDias(e.target.value.replace(/\D/g, "").slice(0, 2))}
            />
            <div className={styles.note}>
              {diasNum === 0
                ? "Ingrese los días laborados para realizar la liquidación."
                : r76.rango
                  ? `${r76.rango.label} → IBC de ${r76.rango.fraccion === 1 ? "1" : r76.rango.fraccion === 0.75 ? "3/4" : r76.rango.fraccion === 0.5 ? "1/2" : "1/4"} SMMLV (${cop(r76.ibc)}).`
                  : "Máximo 30 días."}
            </div>

            <label className={styles.label}>¿Qué incluye tu aporte?</label>
            <label className={styles.check}>
              <input type="checkbox" checked={salud} onChange={(e) => setSalud(e.target.checked)} />
              Salud (12,5%)
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={pension} onChange={(e) => setPension(e.target.checked)} />
              Pensión (16%)
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={arl} onChange={(e) => setArl(e.target.checked)} />
              ARL — voluntaria, salvo alto riesgo (IV o V)
            </label>

            {arl && (
              <>
                <label className={styles.label}>Nivel de riesgo (ARL)</label>
                <div className={styles.risk}>
                  {["I", "II", "III", "IV", "V"].map((k) => (
                    <button
                      key={k}
                      type="button"
                      className={riesgo === k ? styles.on : ""}
                      onClick={() => setRiesgo(k)}
                    >
                      {k}
                    </button>
                  ))}
                </div>
                <div className={styles.note}>
                  El ARL siempre se liquida sobre 1 SMMLV y 30 días, sin importar los días
                  trabajados.
                </div>
              </>
            )}

            <label className={styles.label}>Tarifa Caja de Compensación</label>
            <div className={styles.toggle2}>
              <button
                type="button"
                className={cajaRate === 0.006 ? styles.on : ""}
                onClick={() => setCajaRate(0.006)}
              >
                0,6%
              </button>
              <button
                type="button"
                className={cajaRate === 0.02 ? styles.on : ""}
                onClick={() => setCajaRate(0.02)}
              >
                2%
              </button>
            </div>
          </>
        ) : (
          <>
            {es73 ? (
              <>
                <label className={styles.label}>Ingresos mensuales</label>
                <div className={styles.modeBadge}>IBC fijo: 1 SMMLV ({cop(SMMLV)})</div>
                <div className={styles.note}>
                  El Interno de Medicina cotiza siempre sobre 1 SMMLV, sin importar sus
                  ingresos reales.
                </div>
              </>
            ) : (
              <>
                <label className={styles.label}>Tus ingresos mensuales</label>
                <input
                  className={styles.field}
                  type="text"
                  inputMode="numeric"
                  value={ingresos ? new Intl.NumberFormat("es-CO").format(ingresos) : ""}
                  placeholder="$ 0"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    setIngresos(digits ? Number(digits) : 0);
                  }}
                />
                <div className={styles.note}>
                  El IBC es el 40% de tus ingresos, con mínimo 1 SMMLV ({cop(SMMLV)}).
                </div>
              </>
            )}

            <label className={styles.label}>¿Qué incluye tu aporte?</label>
            {es59 && !exterior && (
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={salud}
                  onChange={(e) => setSalud(e.target.checked)}
                />
                Salud (12,5%) — obligatoria para el independiente
              </label>
            )}
            {(es03 || es73) && (
              <div className={styles.note}>Salud (12,5%) — incluida siempre en este tipo.</div>
            )}
            {es59 && (
              <label className={styles.check}>
                <input type="checkbox" checked={pension} onChange={(e) => setPension(e.target.checked)} />
                Pensión (16%) — desmárcala si ya está pensionado
              </label>
            )}
            {(es03 || es73) && (
              <div className={styles.note}>Pensión (16%) — incluida siempre en este tipo.</div>
            )}
            {es59 && (
              <label className={styles.check}>
                <input type="checkbox" checked={arl} onChange={(e) => setArl(e.target.checked)} />
                ARL — voluntaria, salvo alto riesgo (IV o V)
              </label>
            )}
            {es03 && (
              <div className={styles.note}>Este tipo de cotizante no incluye ARL.</div>
            )}

            {(effArl) && (
              <>
                <label className={styles.label}>Nivel de riesgo (ARL)</label>
                <div className={styles.risk}>
                  {["I", "II", "III", "IV", "V"].map((k) => (
                    <button
                      key={k}
                      type="button"
                      className={riesgo === k ? styles.on : ""}
                      onClick={() => setRiesgo(k)}
                    >
                      {k}
                    </button>
                  ))}
                </div>
                <div className={styles.note}>
                  {es57
                    ? "La ARL es obligatoria en este tipo de cotizante."
                    : "Conductores y transportadores suelen ser clase IV o V."}
                </div>
              </>
            )}

            <label className={styles.check}>
              <input type="checkbox" checked={caja} onChange={(e) => setCaja(e.target.checked)} />
              Caja de Compensación — voluntaria (Ley 789 de 2002)
            </label>
            {caja && (
              <>
                <div className={styles.toggle2} style={{ marginTop: 8 }}>
                  <button
                    type="button"
                    className={cajaRate === 0.006 ? styles.on : ""}
                    onClick={() => setCajaRate(0.006)}
                  >
                    0,6%
                  </button>
                  <button
                    type="button"
                    className={cajaRate === 0.02 ? styles.on : ""}
                    onClick={() => setCajaRate(0.02)}
                  >
                    2%
                  </button>
                </div>
                <div className={styles.infobox}>
                  {cajaRate === 0.006 ? (
                    <>
                      <b>Aporte del 0,6%</b> — el más económico. Da acceso a recreación,
                      capacitación y turismo social.
                    </>
                  ) : (
                    <>
                      <b>Aporte del 2%</b> — beneficios completos: educación, recreación,
                      cultura, vivienda, créditos y subsidio de vivienda. No incluye la
                      cuota monetaria en dinero (ningún independiente la recibe).
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}

        <button type="button" className={styles.btnCalcular} onClick={calcular}>
          Calcular mi aporte
        </button>
      </div>

      <div className={styles.out}>
        <div className={styles.outLabel}>Tu resultado</div>
        <div
          ref={resultRef}
          className={`${styles.offerCard} ${resaltar ? styles.offerCardResaltada : ""}`}
        >
        {esDias76 ? (
          <>
            <div className={styles.row}>
              <span>IBC Pensión / Caja ({r76.rango ? r76.rango.label : "—"})</span>
              <b>{cop(r76.ibc)}</b>
            </div>
            {r76.salud > 0 && (
              <div className={styles.row}>
                <span>Salud (12,5%)</span>
                <b>{cop(r76.salud)}</b>
              </div>
            )}
            {r76.pension > 0 && (
              <div className={styles.row}>
                <span>Pensión (16%)</span>
                <b>{cop(r76.pension)}</b>
              </div>
            )}
            {r76.arl > 0 && (
              <>
                <div className={styles.row}>
                  <span>IBC ARL (fijo, 30 días)</span>
                  <b>{cop(r76.ibcArl)}</b>
                </div>
                <div className={styles.row}>
                  <span>ARL (riesgo {riesgo})</span>
                  <b>{cop(r76.arl)}</b>
                </div>
              </>
            )}
            <div className={styles.row}>
              <span>Caja ({cajaRate === 0.006 ? "0,6%" : "2%"})</span>
              <b>{cop(r76.caja)}</b>
            </div>
          </>
        ) : (
          <>
            <div className={styles.row}>
              <span>
                IBC (base de cotización){es73 ? " · fijo por ley" : flooredMin ? " · mínimo" : ""}
              </span>
              <b>{cop(r.ibc)}</b>
            </div>
            {r.salud > 0 && (
              <div className={styles.row}>
                <span>Salud (12,5%)</span>
                <b>{cop(r.salud)}</b>
              </div>
            )}
            {r.pension > 0 && (
              <div className={styles.row}>
                <span>Pensión (16%)</span>
                <b>{cop(r.pension)}</b>
              </div>
            )}
            {r.arl > 0 && (
              <div className={styles.row}>
                <span>ARL (riesgo {riesgo})</span>
                <b>{cop(r.arl)}</b>
              </div>
            )}
            {r.caja > 0 && (
              <div className={styles.row}>
                <span>Caja ({cajaRate === 0.006 ? "0,6%" : "2%"})</span>
                <b>{cop(r.caja)}</b>
              </div>
            )}
            {r.fsp > 0 && (
              <div className={styles.row}>
                <span>Fondo de Solidaridad ({(r.fspTasa * 100).toFixed(1)}%)</span>
                <b>{cop(r.fsp)}</b>
              </div>
            )}
          </>
        )}

        <div className={styles.total}>
          <div className={styles.totalLab}>
            {esDias76 ? "Total a pagar" : "Tu aporte mensual de ley"}
          </div>
          <div className={styles.totalRow}>
            <div className={styles.totalAmt}>{cop(esDias76 ? r76.total : r.total)}</div>
            <button
              type="button"
              className={styles.usdBtn}
              onClick={toggleUsd}
              disabled={loadingUsd}
            >
              {loadingUsd ? "Cargando…" : showUsd ? "Ver en COP" : "Ver en USD"}
            </button>
          </div>
          {showUsd && usdRate && (
            <div className={styles.usdAmt}>
              ≈ {usd((esDias76 ? r76.total : r.total) / usdRate)} USD
              <span className={styles.usdNote}> · 1 USD ≈ {cop(usdRate)}</span>
            </div>
          )}
          {usdError && <div className={styles.usdErrorMsg}>{usdError}</div>}
        </div>
        </div>
        {esDias76 ? (
          <div className={styles.note}>
            Cotizante 76 — trabajador de tiempo parcial independiente. Verifica siempre
            la normativa y parametrización vigente del operador PILA antes de pagar.
          </div>
        ) : (
          <div className={styles.note}>
            + gestión ¡Afiliamos Ya!: $29.900/mes — afiliación, planilla, soporte y
            ARL incluida.
          </div>
        )}
        <WhatsAppButton mensaje={cotizaMsg} className={styles.btnWa}>
          Recibir mi cotización exacta
        </WhatsAppButton>
        {!esDias76 && (
          <div className={styles.avoidFeeBox}>
            <p>¿Quieres evitar pagar el valor de gestión?</p>
            <Link href="/independientes" className={styles.avoidFeeLink}>
              Conoce ¡Afiliamos Ya! Premium
            </Link>
          </div>
        )}
      </div>
    </div>
    )}

    {showPensionProjection && (
    <div className={styles.pensionWrap}>
      <div className={styles.pensionHead}>
        <div className={styles.pensionTitle}>¿Cuándo te pensionas y con cuánto?</div>
        <p className={styles.note} style={{ marginTop: 6 }}>
          Proyección estimada según la fórmula de tasa de reemplazo de
          Colpensiones (Régimen de Prima Media). No es un cálculo oficial: tu
          mesada real depende del promedio indexado de tus últimos 10 años
          cotizados, entre otros factores. Para un valor exacto, habla con un
          asesor.
        </p>
      </div>

      <div className={styles.pensionInputs}>
        <div>
          <label className={styles.label}>Sexo</label>
          <div className={styles.toggle2}>
            <button
              type="button"
              className={sexo === "hombre" ? styles.on : ""}
              onClick={() => setSexo("hombre")}
            >
              Hombre
            </button>
            <button
              type="button"
              className={sexo === "mujer" ? styles.on : ""}
              onClick={() => setSexo("mujer")}
            >
              Mujer
            </button>
          </div>
        </div>

        <div>
          <label className={styles.label}>Tu edad actual</label>
          <input
            className={styles.field}
            type="text"
            inputMode="numeric"
            placeholder="Ej: 35"
            value={edadActual}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setEdadActual(e.target.value.replace(/\D/g, "").slice(0, 3))}
          />
        </div>

        <div>
          <label className={styles.label}>Semanas ya cotizadas</label>
          <input
            className={styles.field}
            type="text"
            inputMode="numeric"
            placeholder="Ej: 400"
            value={semanasCotizadas}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setSemanasCotizadas(e.target.value.replace(/\D/g, "").slice(0, 5))}
          />
        </div>
      </div>

      {datosPensionCompletos && (
        <>
          <div className={styles.pensionSummary}>
            <span>
              Edad de pensión: <b>{proyeccionIbc.edadPension} años</b>
            </span>
            <span>
              Te faltan: <b>{proyeccionIbc.aniosRestantes} años</b> (
              {proyeccionIbc.semanasRestantes} semanas)
            </span>
            <span>
              Semanas proyectadas al pensionarte: <b>{proyeccionIbc.semanasProyectadas}</b>
            </span>
          </div>

          {!proyeccionIbc.cumpleMinimo && (
            <div className={styles.warnBox}>
              Con estos datos no alcanzarías las{" "}
              <b>1.300 semanas mínimas</b> exigidas por Colpensiones para
              pensionarte por vejez en el Régimen de Prima Media. Te
              faltarían{" "}
              <b>{SEMANAS_MINIMAS - proyeccionIbc.semanasProyectadas}</b>{" "}
              semanas más — hablar con un asesor te ayuda a ver alternativas
              (seguir cotizando más tiempo, indemnización sustitutiva, o
              traslado de régimen).
            </div>
          )}

          <div className={styles.pensionScenarios}>
            <div className={styles.scenarioCard}>
              <div className={styles.scenarioLabel}>Cotizando con el salario mínimo</div>
              <div className={styles.scenarioAmt}>
                {proyeccionMinimo.cumpleMinimo ? cop(proyeccionMinimo.pensionEstimada) : "—"}
              </div>
              <div className={styles.scenarioTasa}>
                {proyeccionMinimo.cumpleMinimo
                  ? `Tasa de reemplazo estimada: ${proyeccionMinimo.tasa.toFixed(1)}%`
                  : "No alcanzas las semanas mínimas con este escenario."}
              </div>
            </div>
            <div className={`${styles.scenarioCard} ${styles.scenarioOn}`}>
              <div className={styles.scenarioLabel}>Cotizando con tu IBC actual ({cop(ibcActual)})</div>
              <div className={styles.scenarioAmt}>
                {proyeccionIbc.cumpleMinimo ? cop(proyeccionIbc.pensionEstimada) : "—"}
              </div>
              <div className={styles.scenarioTasa}>
                {proyeccionIbc.cumpleMinimo
                  ? `Tasa de reemplazo estimada: ${proyeccionIbc.tasa.toFixed(1)}%`
                  : "No alcanzas las semanas mínimas con este escenario."}
              </div>
            </div>
          </div>

          <WhatsAppButton mensaje={pensionMsg} className={styles.btnWa}>
            Hablar con un asesor sobre mi pensión
          </WhatsAppButton>
        </>
      )}
    </div>
    )}
    </>
  );
}
