export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El panel interno (CRM) se agrega en una fase posterior — se excluye
      // aquí de forma anticipada para que quede bloqueado desde el día uno.
      disallow: "/panel",
    },
    sitemap: "https://afiliamosya.com/sitemap.xml",
  };
}
