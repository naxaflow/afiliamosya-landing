// Allow-list de valores válidos para la columna "origen" de leads.
// Se extiende a medida que se agregan páginas con formulario propio.
export const ORIGENES = [
  "home",
  "calculadora",
  "contacto",
  "independientes",
  "salud",
  "arl-colectiva",
  "exterior",
  "comunidad",
];

export const esOrigenValido = (origen) => ORIGENES.includes(origen);
