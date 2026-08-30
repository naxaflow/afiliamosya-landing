const PAGINAS = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/salud", priority: 0.8, changeFrequency: "monthly" },
  { path: "/arl-colectiva", priority: 0.9, changeFrequency: "monthly" },
  { path: "/independientes", priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculadora", priority: 0.9, changeFrequency: "yearly" },
  { path: "/exterior", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacidad", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terminos", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap() {
  return PAGINAS.map(({ path, priority, changeFrequency }) => ({
    url: `https://afiliamosya.com${path}`,
    lastModified: new Date("2026-08-25"),
    changeFrequency,
    priority,
  }));
}
