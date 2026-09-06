// --- Parámetros legales 2026 (fuente: Siscoopweb / normativa vigente) ---
export const SMMLV = 1750905;
export const ARL_RATES = { I: 0.00522, II: 0.01044, III: 0.02436, IV: 0.0435, V: 0.0696 };

// Redondea al múltiplo de 100 hacia arriba (como exige la PILA)
export const r100 = (n) => Math.ceil((n || 0) / 100) * 100;

export const cop = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Math.round(n || 0));

// Fondo de Solidaridad Pensional — Ley 100 de 1993 (art. 8 y 9), modificada
// por la Ley 797 de 2003 (art. 27). Se aplica sobre el aporte a pensión desde
// 4 SMMLV: 1% fijo (subcuenta de solidaridad) hasta 16 SMMLV, y desde ahí un
// punto adicional creciente (subcuenta de subsistencia) hasta un tope de 2%
// a partir de 20 SMMLV.
export function tasaFSP(ibc) {
  const s = ibc / SMMLV;
  if (s < 4) return 0;
  if (s >= 20) return 0.02;
  if (s >= 19) return 0.018;
  if (s >= 18) return 0.016;
  if (s >= 17) return 0.014;
  if (s >= 16) return 0.012;
  return 0.01;
}

export function liquidar(ingresos, o) {
  const ibc = Math.min(Math.max(ingresos * 0.4, SMMLV), 25 * SMMLV);
  const salud = !o.exterior && o.salud ? r100(ibc * 0.125) : 0; // exterior no aporta salud
  const pension = o.pension ? r100(ibc * 0.16) : 0;
  const arl = o.arl ? r100(ibc * ARL_RATES[o.riesgo]) : 0;
  const caja = o.caja ? r100(ibc * o.cajaRate) : 0; // 0.006 o 0.02, voluntaria
  const fspTasa = o.pension ? tasaFSP(ibc) : 0;
  const fsp = fspTasa ? r100(ibc * fspTasa) : 0; // fondo de solidaridad pensional
  const total = salud + pension + arl + caja + fsp;
  return { ibc, salud, pension, arl, caja, fsp, fspTasa, total };
}

// --- Cotizante 76 — Trabajador de Tiempo Parcial Independiente ---
// Resolución 1529 de 2026. El IBC de Pensión y Caja NO se calcula
// proporcional a los días (SMMLV / 30 × días): se determina por rangos fijos
// de días trabajados en el mes. El ARL, en cambio, siempre se liquida sobre
// 1 SMMLV y 30 días, sin importar cuántos días haya trabajado la persona.
export const RANGOS_DIAS_76 = [
  { min: 1, max: 7, fraccion: 1 / 4, label: "1 a 7 días" },
  { min: 8, max: 14, fraccion: 1 / 2, label: "8 a 14 días" },
  { min: 15, max: 21, fraccion: 3 / 4, label: "15 a 21 días" },
  { min: 22, max: 30, fraccion: 1, label: "22 a 30 días" },
];

export function rangoPorDias(dias) {
  return RANGOS_DIAS_76.find((r) => dias >= r.min && dias <= r.max) || null;
}

export function liquidarCotizante76({
  dias,
  riesgo,
  cajaRate,
  salud = true,
  pension = true,
  arl = true,
}) {
  const rango = rangoPorDias(dias);
  const ibc = rango ? r100(SMMLV * rango.fraccion) : 0;
  const saludAporte = ibc && salud ? r100(ibc * 0.125) : 0;
  const pensionAporte = ibc && pension ? r100(ibc * 0.16) : 0;
  const ibcArl = SMMLV;
  const diasArl = 30;
  const arlAporte = ibc && arl ? r100(ibcArl * ARL_RATES[riesgo]) : 0;
  const caja = ibc ? r100(ibc * cajaRate) : 0;
  const total = saludAporte + pensionAporte + arlAporte + caja;
  return {
    rango,
    ibc,
    salud: saludAporte,
    pension: pensionAporte,
    ibcArl,
    diasArl,
    arl: arlAporte,
    caja,
    total,
  };
}

// --- Proyección de pensión (Régimen de Prima Media / Colpensiones) ---
// Reglas vigentes de la Ley 100 de 1993 — la reforma pensional (Ley 2381)
// todavía NO aplica: entra en vigencia el 1 de abril de 2027.
//
// Edad y semanas mínimas: hombres 62 años + 1.300 semanas; mujeres 57 años +
// 1.250 semanas en 2026 (esta cifra para mujeres baja cada año por decisión
// de la Corte Constitucional, no por la reforma — hay que revisarla cada
// año). Tasa de reemplazo: 65% del IBL con el mínimo de semanas, +1.5 puntos
// por cada 50 semanas adicionales cotizadas, con tope de 80% (se alcanza a
// las 1.800 semanas para quienes necesitan 1.300 como mínimo). La mesada
// nunca es menor a 1 SMMLV ni mayor a 25 SMMLV.
//
// Nota: una semana solo se acredita cuando el aporte mensual equivale como
// mínimo al 75% del salario mínimo semanal — no se modela aquí porque esta
// proyección recibe las semanas ya cotizadas como dato de entrada.
//
// Esto sigue siendo una estimación educativa, no un cálculo oficial: el IBL
// real de Colpensiones se calcula sobre el promedio indexado de los últimos
// 10 años cotizados (o toda la vida laboral si es mejor), mientras que aquí
// se asume un único IBC constante durante el tiempo que falta.
export const EDAD_PENSION = { hombre: 62, mujer: 57 };
export const SEMANAS_MINIMAS = { hombre: 1300, mujer: 1250 }; // 2026

export function proyectarPension({ sexo, edadActual, semanasCotizadas, ibl }) {
  const edadPension = EDAD_PENSION[sexo] ?? EDAD_PENSION.hombre;
  const semanasMinimas = SEMANAS_MINIMAS[sexo] ?? SEMANAS_MINIMAS.hombre;
  const aniosRestantes = Math.max(0, edadPension - edadActual);
  const semanasRestantes = Math.round(aniosRestantes * 52.14);
  const semanasProyectadas = Math.max(0, semanasCotizadas) + semanasRestantes;
  const cumpleMinimo = semanasProyectadas >= semanasMinimas;

  // 65% con el mínimo de semanas, +1.5 puntos por cada 50 semanas
  // adicionales cotizadas, con tope de 80%.
  const semanasExtra = Math.max(0, semanasProyectadas - semanasMinimas);
  const tasa = Math.min(80, 65 + Math.floor(semanasExtra / 50) * 1.5);

  // Mesada: nunca menor a 1 SMMLV ni mayor a 25 SMMLV, si cumple semanas.
  const pensionEstimada = cumpleMinimo
    ? Math.min(Math.max(r100(ibl * (tasa / 100)), SMMLV), 25 * SMMLV)
    : 0;

  return {
    edadPension,
    semanasMinimas,
    aniosRestantes,
    semanasRestantes,
    semanasProyectadas,
    cumpleMinimo,
    tasa,
    pensionEstimada,
  };
}
