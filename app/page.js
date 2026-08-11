"use client";

import React, { useState, useMemo } from "react";
import LeadForm from "@/components/LeadForm";

/**
 * AFILIAMOS YA — Landing de conversión v1
 * -------------------------------------------------
 * Público: conductor / distribuidor independiente que necesita
 * seguridad social CON ARL (riesgo IV/V).
 * Objetivo único de la página: pedir cotización por WhatsApp
 * (capturando el consentimiento de tratamiento de datos).
 *
 * >>> ANTES DE PUBLICAR, EDITA ESTAS 3 CONSTANTES <<<
 */
const WHATSAPP_NUMBER = "573112826000";      // <- tu número real, formato 57 + celular
const ADMIN_FEE_FROM  = 29900;               // <- tu cuota de administración real (placeholder)
const BRAND           = "¡Afiliamos Ya!";

// --- Parámetros legales 2026 (fuente: Siscoopweb / normativa vigente) ---
const SMMLV = 1750905;
const ARL_RATES = { I: 0.00522, II: 0.01044, III: 0.02436, IV: 0.0435, V: 0.0696 };

// Redondea al múltiplo de 100 hacia arriba (como exige la PILA)
const r100 = (n) => Math.ceil((n || 0) / 100) * 100;

const cop = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Math.round(n || 0));

function liquidar(ingresos, o) {
  const ibc = Math.min(Math.max(ingresos * 0.4, SMMLV), 25 * SMMLV);
  const salud = !o.exterior && o.salud ? r100(ibc * 0.125) : 0; // exterior no aporta salud
  const pension = o.pension ? r100(ibc * 0.16) : 0;
  const arl = o.arl ? r100(ibc * ARL_RATES[o.riesgo]) : 0;
  const caja = o.caja ? r100(ibc * o.cajaRate) : 0; // 0.006 o 0.02, voluntaria
  const fsp = o.pension && ibc >= 4 * SMMLV ? r100(ibc * 0.01) : 0; // solidaridad pensional
  const total = salud + pension + arl + caja + fsp;
  return { ibc, salud, pension, arl, caja, fsp, total };
}

const css = `
:root{
  --ink:#0f272d; --ink-soft:#1b3b43; --paper:#f5f4ef; --paper-2:#ecebe3;
  --amber:#f2a71b; --amber-deep:#c9830a; --teal:#2c7d76; --teal-2:#e3efec;
  --line:rgba(15,39,45,.12); --muted:#5b6d70;
}
*{box-sizing:border-box}
.ay{font-family:"Public Sans",system-ui,sans-serif;color:var(--ink);
  background:var(--paper);line-height:1.5;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.ay h1,.ay h2,.ay h3,.ay .display{font-family:"Bricolage Grotesque","Public Sans",sans-serif;
  line-height:1.02;letter-spacing:-.02em;font-weight:800;margin:0}
.wrap{max-width:1080px;margin:0 auto;padding:0 22px}
.eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--teal)}
.btn{display:inline-flex;align-items:center;gap:.5rem;border:none;cursor:pointer;
  font-family:inherit;font-weight:700;font-size:1rem;border-radius:999px;padding:.9rem 1.4rem;
  text-decoration:none;transition:transform .12s ease,box-shadow .12s ease}
.btn:hover{transform:translateY(-2px)}
.btn-wa{background:var(--amber);color:#231402;box-shadow:0 8px 22px rgba(242,167,27,.35)}
.btn-ghost{background:transparent;color:var(--paper);border:1.5px solid rgba(245,244,239,.5)}
.btn-teal{background:var(--ink);color:var(--paper)}

/* HERO */
.hero{background:var(--ink);color:var(--paper);position:relative;overflow:hidden;
  padding:38px 0 64px}
.hero:before{content:"";position:absolute;inset:0;pointer-events:none;
  background:
   radial-gradient(680px 380px at 88% -8%, rgba(242,167,27,.16), transparent 60%),
   repeating-linear-gradient(115deg, transparent 0 46px, rgba(245,244,239,.03) 46px 48px)}
.nav{display:flex;align-items:center;justify-content:space-between;position:relative;z-index:2}
.brand{display:flex;align-items:center;gap:.55rem;font-family:"Bricolage Grotesque",sans-serif;
  font-weight:800;font-size:1.25rem;letter-spacing:-.02em}
.brand .dot{width:26px;height:26px;border-radius:8px;background:var(--amber);
  display:grid;place-items:center;color:#231402;font-size:.9rem}
.nav-auth{font-size:.82rem;color:rgba(245,244,239,.7);font-weight:600}
.hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;align-items:center;
  position:relative;z-index:2;margin-top:44px}
.hero h1{font-size:clamp(2.5rem,6vw,4.25rem)}
.hero h1 .hl{color:var(--amber)}
.hero p.lede{font-size:1.15rem;color:rgba(245,244,239,.82);margin:20px 0 0;max-width:34ch}
.hero-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.trust-row{display:flex;gap:18px;flex-wrap:wrap;margin-top:30px;
  font-size:.82rem;color:rgba(245,244,239,.72)}
.trust-row b{color:var(--paper)}
.seal{background:linear-gradient(160deg,#12333a,#0c1f24);border:1px solid rgba(242,167,27,.28);
  border-radius:20px;padding:26px;position:relative}
.seal .badge{display:inline-flex;align-items:center;gap:.45rem;background:rgba(242,167,27,.14);
  color:var(--amber);font-weight:700;font-size:.78rem;padding:.4rem .7rem;border-radius:999px}
.seal h3{color:var(--paper);font-size:1.35rem;margin:16px 0 8px}
.seal p{color:rgba(245,244,239,.75);font-size:.95rem;margin:0}
.seal .big{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;color:var(--amber);
  font-size:2.6rem;line-height:1;margin-top:18px}

/* WEDGE strip */
.wedge{background:var(--amber);color:#231402}
.wedge .wrap{display:flex;align-items:center;gap:16px;padding:16px 22px;flex-wrap:wrap;
  font-weight:600}
.wedge b{font-family:"Bricolage Grotesque",sans-serif}

/* SECTION scaffolding */
.section{padding:64px 0}
.section h2{font-size:clamp(1.9rem,4vw,2.9rem);max-width:20ch}
.section .sub{color:var(--muted);font-size:1.05rem;margin-top:14px;max-width:52ch}

/* CALCULATOR */
.calc{background:var(--ink);color:var(--paper);border-radius:26px;overflow:hidden;
  display:grid;grid-template-columns:1fr 1fr}
.calc .inputs{padding:32px}
.calc .out{padding:32px;background:linear-gradient(180deg,#12333a,#0d2429)}
.calc label{display:block;font-size:.82rem;font-weight:700;letter-spacing:.02em;
  color:rgba(245,244,239,.72);margin:18px 0 8px}
.calc label:first-child{margin-top:0}
.field{width:100%;background:rgba(245,244,239,.06);border:1px solid rgba(245,244,239,.16);
  color:var(--paper);border-radius:12px;padding:.85rem 1rem;font-size:1.05rem;font-family:inherit}
.field:focus{outline:2px solid var(--amber);outline-offset:1px}
.risk{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.risk button{background:rgba(245,244,239,.06);border:1px solid rgba(245,244,239,.16);
  color:rgba(245,244,239,.8);border-radius:10px;padding:.6rem 0;font-weight:700;cursor:pointer;
  font-family:inherit;font-size:.95rem}
.risk button.on{background:var(--amber);color:#231402;border-color:var(--amber)}
.chk{display:flex;align-items:center;gap:.6rem;margin-top:18px;font-size:.9rem;
  color:rgba(245,244,239,.85);cursor:pointer}
.chk input{width:18px;height:18px;accent-color:var(--amber)}
.infobox{margin-top:10px;background:rgba(44,125,118,.14);border:1px solid rgba(44,125,118,.4);
  border-radius:12px;padding:12px 14px;font-size:.86rem;color:rgba(245,244,239,.9);line-height:1.45}
.infobox b{color:var(--amber)}
.row{display:flex;justify-content:space-between;align-items:baseline;padding:.55rem 0;
  border-bottom:1px dashed rgba(245,244,239,.14);font-size:.98rem}
.row span:first-child{color:rgba(245,244,239,.72)}
.row b{font-variant-numeric:tabular-nums}
.total{margin-top:16px;background:rgba(242,167,27,.12);border:1px solid rgba(242,167,27,.35);
  border-radius:14px;padding:16px 18px}
.total .lab{font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;color:var(--amber)}
.total .amt{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:2.3rem;
  line-height:1;margin-top:4px}
.note{font-size:.82rem;color:rgba(245,244,239,.62);margin-top:14px}
.calc .btn-wa{width:100%;justify-content:center;margin-top:16px}

/* SEGMENTS */
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
.card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px}
.card .ic{font-size:1.6rem}
.card h3{font-size:1.15rem;margin:12px 0 6px}
.card p{color:var(--muted);font-size:.92rem;margin:0}

/* ANCLA (B2B) */
.ancla{background:var(--teal-2)}
.ancla-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.ancla .num{font-family:"Bricolage Grotesque",sans-serif;font-weight:800;color:var(--teal);
  font-size:clamp(3.4rem,8vw,5.5rem);line-height:.9}
.ancla ul{list-style:none;padding:0;margin:18px 0 0}
.ancla li{display:flex;gap:.6rem;padding:.4rem 0;font-size:1rem}
.ancla li:before{content:"→";color:var(--teal);font-weight:800}

/* STEPS */
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px;counter-reset:s}
.step{background:#fff;border:1px solid var(--line);border-radius:18px;padding:24px;position:relative}
.step:before{counter-increment:s;content:"0" counter(s);font-family:"Bricolage Grotesque",sans-serif;
  font-weight:800;font-size:1.1rem;color:var(--amber-deep)}
.step h3{font-size:1.1rem;margin:8px 0 6px}
.step p{color:var(--muted);font-size:.92rem;margin:0}

/* FAQ */
.faq{max-width:760px;margin:36px auto 0}
.qa{border-top:1px solid var(--line);padding:20px 0}
.qa summary{font-family:"Bricolage Grotesque",sans-serif;font-weight:700;font-size:1.1rem;
  cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:1rem}
.qa summary::-webkit-details-marker{display:none}
.qa summary:after{content:"+";color:var(--amber-deep);font-size:1.4rem;line-height:1}
.qa[open] summary:after{content:"–"}
.qa p{color:var(--muted);margin:12px 0 0;font-size:.98rem}

/* CLOSER + FOOTER */
.closer{background:var(--ink);color:var(--paper);text-align:center;padding:72px 0}
.closer h2{font-size:clamp(2rem,5vw,3.2rem);max-width:100%;margin:0 auto}
.closer p{color:rgba(245,244,239,.78);max-width:46ch;margin:18px auto 0}
.foot{background:#0a1c21;color:rgba(245,244,239,.6);font-size:.85rem;padding:28px 0}
.foot .wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}

@media(max-width:860px){
  .hero-grid,.calc,.ancla-grid{grid-template-columns:1fr}
  .cards,.steps{grid-template-columns:1fr}
  .calc .out{border-top:1px solid rgba(245,244,239,.12)}
}
`;

export default function App() {
  const [ingresos, setIngresos] = useState(SMMLV);
  const [exterior, setExterior] = useState(false);
  const [salud, setSalud] = useState(true);
  const [pension, setPension] = useState(true);
  const [arl, setArl] = useState(true);
  const [riesgo, setRiesgo] = useState("I");
  const [caja, setCaja] = useState(false);
  const [cajaRate, setCajaRate] = useState(0.02);

  const opts = { exterior, salud, pension, arl, riesgo, caja, cajaRate };
  const r = useMemo(() => liquidar(ingresos, opts), [ingresos, exterior, salud, pension, arl, riesgo, caja, cajaRate]);
  const flooredMin = ingresos * 0.4 < SMMLV; // el 40% quedó por debajo de 1 SMMLV -> aplica el piso

  const waLink = (msg) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const cotizaMsg =
    `Hola ${BRAND}, Quiero afiliarme a seguridad social como independiente. ` +
    `Mis ingresos aprox. son ${cop(ingresos)}/mes${arl ? ` (ARL riesgo ${riesgo})` : ""}. ` +
    `Autorizo que me contacten por este medio para mi cotización.`;

  const anclaMsg =
    `Hola ${BRAND}, tengo una empresa con conductores/distribuidores independientes ` +
    `y quiero afiliar a todo el equipo con ARL. Autorizo que me contacten.`;

  return (
    <div className="ay">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Public+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <nav className="nav">
            <div className="brand">
              <img src="/logo.png" alt="¡Afiliamos Ya!" style={{ height: 34, width: "auto" }} /> {BRAND}
            </div>
            <div className="nav-auth">Con agremiación autorizada · Min. Salud</div>
          </nav>

          <div className="hero-grid">
            <div>
              <span className="eyebrow" style={{ color: "var(--amber)" }}>
                Seguridad social para trabajadores independientes
              </span>
              <h1 style={{ marginTop: 14 }}>
                Trabaja tranquilo.<br />Con <span className="hl">ARL de verdad.</span>
              </h1>
              <p className="lede">
                Contratistas, profesionales, comerciantes y conductores: salud,
                pensión y riesgos laborales al día, sin que tengas que estar
                pendiente. Tú pagas lo mismo de ley — nosotros gestionamos todo.
              </p>
              <div className="hero-cta">
                <a className="btn btn-wa" href={waLink(cotizaMsg)} target="_blank" rel="noreferrer">
                  Cotizar por WhatsApp
                </a>
                <a className="btn btn-ghost" href="#calculadora">Calcular mi aporte</a>
              </div>
              <div className="trust-row">
                <span>⏱️ Respuesta en <b>menos de 30 min</b></span>
                <span>🛡️ ARL que <b>solo una agremiación</b> puede dar</span>
                <span>📄 Planilla y soporte <b>cada mes</b></span>
              </div>
            </div>

            <aside className="seal">
              <span className="badge">◆ El diferenciador</span>
              <h3>La ARL no la da cualquiera.</h3>
              <p>
                Ninguna app de autoliquidación puede afiliarte a riesgos
                laborales. Operamos a través de una agremiación <b>autorizada
                por el Ministerio de Salud</b>, la única figura que puede darte
                ARL colectiva.
              </p>
              <div className="big">+20<span style={{ fontSize: "1rem", color: "rgba(245,244,239,.7)" }}> años protegiendo independientes</span></div>
            </aside>
          </div>
        </div>
      </header>

      {/* WEDGE */}
      <div className="wedge">
        <div className="wrap">
          <b>Sin ARL, un accidente de trabajo te deja sin nada.</b>
          <span>Como independiente tu riesgo es real — tu protección también debe serlo.</span>
        </div>
      </div>

      {/* CALCULADORA */}
      <section className="section" id="calculadora">
        <div className="wrap">
          <span className="eyebrow">Calculadora 2026</span>
          <h2 style={{ marginTop: 10 }}>Mira cuánto es tu aporte de ley</h2>
          <p className="sub">
            Cálculo con los valores oficiales 2026. Es lo que pagarías de todos
            modos como independiente — con nosotros, además, queda gestionado y con ARL.
          </p>

          <div className="calc" style={{ marginTop: 30 }}>
            <div className="inputs">
              <label>Modalidad</label>
              <div className="risk" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <button
                  type="button"
                  className={!exterior ? "on" : ""}
                  onClick={() => { setExterior(false); setSalud(true); setPension(true); }}
                >
                  En Colombia
                </button>
                <button
                  type="button"
                  className={exterior ? "on" : ""}
                  onClick={() => { setExterior(true); setPension(true); setArl(false); setCaja(false); }}
                >
                  Residente exterior
                </button>
              </div>
              <div className="note" style={{ marginTop: 8 }}>
                {exterior
                  ? "El residente en el exterior solo puede aportar pensión (Decreto 682 de 2014)."
                  : "Independiente que cotiza en Colombia."}
              </div>

              <label>Tus ingresos mensuales</label>
              <input
                className="field"
                type="text"
                inputMode="numeric"
                value={ingresos ? new Intl.NumberFormat("es-CO").format(ingresos) : ""}
                placeholder="$ 0"
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");
                  setIngresos(digits ? Number(digits) : 0);
                }}
              />
              <div className="note" style={{ marginTop: 8 }}>
                El IBC es el 40% de tus ingresos, con mínimo 1 SMMLV ({cop(SMMLV)}).
              </div>

              <label>¿Qué incluye tu aporte?</label>
              {!exterior && (
                <label className="chk">
                  <input type="checkbox" checked={salud} onChange={(e) => setSalud(e.target.checked)} />
                  Salud (12,5%) — obligatoria para el independiente
                </label>
              )}
              <label className="chk">
                <input type="checkbox" checked={pension} onChange={(e) => setPension(e.target.checked)} />
                Pensión (16%) — desmárcala si ya está pensionado
              </label>
              <label className="chk">
                <input type="checkbox" checked={arl} onChange={(e) => setArl(e.target.checked)} />
                ARL — voluntaria, salvo alto riesgo (IV o V)
              </label>

              {arl && (
                <>
                  <label>Nivel de riesgo (ARL)</label>
                  <div className="risk">
                    {["I", "II", "III", "IV", "V"].map((k) => (
                      <button key={k} type="button" className={riesgo === k ? "on" : ""} onClick={() => setRiesgo(k)}>
                        {k}
                      </button>
                    ))}
                  </div>
                  <div className="note" style={{ marginTop: 8 }}>
                    Conductores y transportadores suelen ser clase IV o V.
                  </div>
                </>
              )}

              <label className="chk">
                <input type="checkbox" checked={caja} onChange={(e) => setCaja(e.target.checked)} />
                Caja de Compensación — voluntaria (Ley 789 de 2002)
              </label>
              {caja && (
                <>
                  <div className="risk" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 8 }}>
                    <button type="button" className={cajaRate === 0.006 ? "on" : ""} onClick={() => setCajaRate(0.006)}>
                      0,6%
                    </button>
                    <button type="button" className={cajaRate === 0.02 ? "on" : ""} onClick={() => setCajaRate(0.02)}>
                      2%
                    </button>
                  </div>
                  <div className="infobox">
                    {cajaRate === 0.006 ? (
                      <>
                        <b>Aporte del 0,6%</b> — el más económico. Da acceso a{" "}
                        recreación, capacitación y turismo social.
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
            </div>

            <div className="out">
              <div className="row">
                <span>IBC (base de cotización){flooredMin ? " · mínimo" : ""}</span>
                <b>{cop(r.ibc)}</b>
              </div>
              {r.salud > 0 && <div className="row"><span>Salud (12,5%)</span><b>{cop(r.salud)}</b></div>}
              {r.pension > 0 && <div className="row"><span>Pensión (16%)</span><b>{cop(r.pension)}</b></div>}
              {r.arl > 0 && <div className="row"><span>ARL (riesgo {riesgo})</span><b>{cop(r.arl)}</b></div>}
              {r.caja > 0 && <div className="row"><span>Caja ({cajaRate === 0.006 ? "0,6%" : "2%"})</span><b>{cop(r.caja)}</b></div>}
              {r.fsp > 0 && <div className="row"><span>Fondo de Solidaridad (1%)</span><b>{cop(r.fsp)}</b></div>}

              <div className="total">
                <div className="lab">Tu aporte mensual de ley</div>
                <div className="amt">{cop(r.total)}</div>
              </div>
              <div className="note">
                + gestión {BRAND} <b>para independientes</b> desde {cop(ADMIN_FEE_FROM)}/mes:
                afiliación, planilla, soporte y ARL incluida. Valor exacto en tu cotización.
              </div>
              <a className="btn btn-wa" href={waLink(cotizaMsg)} target="_blank" rel="noreferrer">
                Recibir mi cotización exacta
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <span className="eyebrow">Para quién</span>
          <h2 style={{ marginTop: 10 }}>Hecho para cada tipo de independiente</h2>
          <div className="cards">
            {[
              ["📄", "Contratistas de prestación de servicios", "Con contrato de más de un mes, la ARL es obligatoria. Te dejamos al día para firmar sin líos."],
              ["💼", "Profesionales independientes", "Consultores, salud, ingeniería, derecho. Salud, pensión y ARL en regla, sin perder tiempo."],
              ["🏪", "Comerciantes y cuenta propia", "Trabajas por tu cuenta. Calculamos el aporte justo sobre tu IBC y lo gestionamos cada mes."],
              ["🚕", "Conductores de app y taxi", "Muchas plataformas ya te exigen estar al día. Te dejamos listo para trabajar sin trabas."],
              ["🚚", "Camioneros y transportadores", "Riesgo clase V cubierto. Protección real para las horas que pasas en carretera."],
              ["📦", "Distribuidores y repartidores", "Comercializas producto por tu cuenta. Te afiliamos como independiente, con ARL."],
            ].map(([ic, t, d]) => (
              <div className="card" key={t}>
                <div className="ic">{ic}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPRESA ANCLA (B2B) */}
      <section className="section ancla">
        <div className="wrap">
          <div className="ancla-grid">
            <div>
              <div className="num">1 llamada<br />= todo tu equipo</div>
            </div>
            <div>
              <span className="eyebrow">¿Tienes una flota?</span>
              <h2 style={{ marginTop: 10, fontSize: "clamp(1.7rem,3.5vw,2.4rem)" }}>
                Afiliamos a todo tu equipo de independientes
              </h2>
              <p className="sub">
                Si tu empresa trabaja con contratistas, conductores, distribuidores u
                otros independientes, los dejamos a todos protegidos con ARL — sin que
                tú tengas que administrar nada.
              </p>
              <ul>
                <li>Un solo contacto, todo tu equipo cubierto</li>
                <li>ARL colectiva que solo una agremiación autorizada puede dar</li>
                <li>Reporte mensual del estado de cada persona</li>
              </ul>
              <a
                className="btn btn-teal"
                style={{ marginTop: 22 }}
                href={waLink(anclaMsg)}
                target="_blank"
                rel="noreferrer"
              >
                Afiliar a mi equipo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Cómo funciona</span>
          <h2 style={{ marginTop: 10 }}>Listo en el mismo día</h2>
          <div className="steps">
            {[
              ["Nos escribes", "Un mensaje por WhatsApp con tus datos básicos. Sin filas, sin oficina."],
              ["Te cotizamos", "Te decimos tu aporte exacto y tu cuota, con la ARL de tu actividad."],
              ["Quedas al día", "Radicamos tu afiliación y cada mes te enviamos tu planilla y soporte."],
            ].map(([t, d]) => (
              <div className="step" key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 style={{ marginTop: 10 }}>Lo que todo independiente pregunta</h2>
          <div className="faq">
            {[
              ["¿Me dan ARL de verdad?", "Sí. Operamos a través de una agremiación autorizada por el Ministerio de Salud, lo que nos permite afiliarte a riesgos laborales de forma colectiva. Es algo que ninguna app de autoliquidación puede ofrecer."],
              ["¿Cuánto pago al mes?", "Pagas tus aportes de ley (los que ves en la calculadora) más una cuota de administración por gestionarte todo. Te damos el valor exacto en tu cotización."],
              ["¿Qué es el IBC?", "Es la base sobre la que se calculan tus aportes. Para independientes es el 40% de tus ingresos, con un mínimo de 1 salario mínimo. Nosotros lo calculamos bien para que la UGPP no te haga requerimientos."],
              ["¿Qué pasa si dejo de pagar un mes?", "Puedes caer en mora, perder cobertura y acumular sanciones. Por eso te enviamos recordatorios y llevamos tu control mes a mes."],
            ].map(([q, a]) => (
              <details className="qa" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* AFILIACIÓN — formulario que guarda el lead en Supabase */}
      <LeadForm />

      {/* CLOSER */}
      <section className="closer">
        <div className="wrap">
          <h2>Ponte al día hoy.<br />Maneja tranquilo mañana.</h2>
          <p>Escríbenos por WhatsApp y en menos de 30 minutos sabes exactamente cómo quedas protegido.</p>
          <a
            className="btn btn-wa"
            style={{ marginTop: 26 }}
            href={waLink(cotizaMsg)}
            target="_blank"
            rel="noreferrer"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <span>{BRAND} · Operamos a través de una agremiación autorizada por el Ministerio de Salud</span>
          <span>
            Al escribirnos autorizas el tratamiento de tus datos conforme a la Ley 1581 de 2012.
          </span>
        </div>
      </footer>
    </div>
  );
}