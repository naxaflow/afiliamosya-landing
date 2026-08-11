import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://afiliamosya-landing.vercel.app"),
  title: "¡Afiliamos Ya! — Seguridad social con ARL para independientes",
  description:
    "Salud, pensión y ARL al día para contratistas, profesionales, comerciantes y conductores. Cotiza por WhatsApp en minutos.",
  openGraph: {
    title: "¡Afiliamos Ya! — Con ARL de verdad",
    description:
      "Salud, pensión y ARL al día. Solo una agremiación autorizada puede darte ARL. Cotiza por WhatsApp.",
    url: "https://afiliamosya-landing.vercel.app",
    siteName: "¡Afiliamos Ya!",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¡Afiliamos Ya! — Con ARL de verdad",
    description: "Salud, pensión y ARL al día. Cotiza por WhatsApp en minutos.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}