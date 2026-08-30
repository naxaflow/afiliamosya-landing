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

export function liquidar(ingresos, o) {
  const ibc = Math.min(Math.max(ingresos * 0.4, SMMLV), 25 * SMMLV);
  const salud = !o.exterior && o.salud ? r100(ibc * 0.125) : 0; // exterior no aporta salud
  const pension = o.pension ? r100(ibc * 0.16) : 0;
  const arl = o.arl ? r100(ibc * ARL_RATES[o.riesgo]) : 0;
  const caja = o.caja ? r100(ibc * o.cajaRate) : 0; // 0.006 o 0.02, voluntaria
  const fsp = o.pension && ibc >= 4 * SMMLV ? r100(ibc * 0.01) : 0; // solidaridad pensional
  const total = salud + pension + arl + caja + fsp;
  return { ibc, salud, pension, arl, caja, fsp, total };
}

// --- Proyección de pensión (Régimen de Prima Media / Colpensiones) ---
// Estimación educativa basada en la fórmula de tasa de reemplazo de la Ley
// 100 de 1993 (Art. 34, modificado por la Ley 797 de 2003). NO es un cálculo
// oficial: el IBL real de Colpensiones se calcula sobre el promedio indexado
// de los últimos 10 años cotizados (o toda la vida laboral si es mejor),
// mientras que aquí se asume un único IBC constante durante el tiempo que
// falta — una simplificación para dar una idea aproximada, no el valor
// exacto de la mesada.
export const EDAD_PENSION = { hombre: 62, mujer: 57 };
export const SEMANAS_MINIMAS = 1300; // 25 años cotizados

export function proyectarPension({ sexo, edadActual, semanasCotizadas, ibl }) {
  const edadPension = EDAD_PENSION[sexo] ?? EDAD_PENSION.hombre;
  const aniosRestantes = Math.max(0, edadPension - edadActual);
  const semanasRestantes = Math.round(aniosRestantes * 52.14);
  const semanasProyectadas = Math.max(0, semanasCotizadas) + semanasRestantes;
  const cumpleMinimo = semanasProyectadas >= SEMANAS_MINIMAS;

  // Tasa de reemplazo: 65.5% - 0.5 * (IBL en salarios mínimos), entre 55% y 80%.
  const s = ibl / SMMLV;
  let tasa = 65.5 - 0.5 * s;
  tasa = Math.min(80, Math.max(55, tasa));
  // +1.5 puntos por cada 50 semanas adicionales sobre las 1300 mínimas (tope 1800).
  const semanasExtra = Math.max(0, Math.min(semanasProyectadas, 1800) - SEMANAS_MINIMAS);
  const bonus = Math.floor(semanasExtra / 50) * 1.5;
  tasa = Math.min(80, tasa + bonus);

  // Garantía de pensión mínima = 1 SMMLV, si cumple semanas.
  const pensionEstimada = cumpleMinimo ? Math.max(r100(ibl * (tasa / 100)), SMMLV) : 0;

  return {
    edadPension,
    aniosRestantes,
    semanasRestantes,
    semanasProyectadas,
    cumpleMinimo,
    tasa,
    pensionEstimada,
  };
}
