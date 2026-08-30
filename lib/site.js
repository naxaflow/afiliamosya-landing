export const BRAND = "¡Afiliamos Ya!";
export const WHATSAPP_NUMBER = "573112826000"; // +57 311 282 6000
export const PHONE_DISPLAY = "+57 311 282 6000";
export const EMAIL = "afiliamosya@gmail.com";
export const SITE_URL = "https://afiliamosya.com";

export const waLink = (mensaje) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/salud", label: "Salud" },
  { href: "/arl-colectiva", label: "ARL Colectiva" },
  { href: "/independientes", label: "Independientes" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/exterior", label: "Colombianos en el Exterior" },
];
