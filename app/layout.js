import localFont from "next/font/local";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const dinAlternate = localFont({
  src: [{ path: "./fonts/DINAlternate-Bold.ttf", weight: "700", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  fallback: ["Archivo", "system-ui", "sans-serif"],
});

// Dos cortes reales (Light 300 + Bold 700) bajo la misma variable — así
// cualquier texto en negrita usa el archivo bold de verdad, no la negrita
// falsa que sintetiza el navegador cuando solo hay un peso disponible.
const roboto = localFont({
  src: [
    { path: "./fonts/Roboto-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Roboto-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial", "system-ui", "sans-serif"],
});

const sequel100Black = localFont({
  src: [{ path: "./fonts/Sequel100Black-76.ttf", weight: "900", style: "normal" }],
  variable: "--font-sequel",
  display: "swap",
  fallback: ["Archivo", "system-ui", "sans-serif"],
});

export const metadata = {
  metadataBase: new URL("https://afiliamosya.com"),
  title: {
    default: "Afiliamos Ya! - Seguridad Social",
    template: "%s | ¡Afiliamos Ya!",
  },
  description:
    "Salud, pensión y ARL al día para independientes, dependientes y empresas. Cotiza por WhatsApp en minutos.",
  openGraph: {
    siteName: "¡Afiliamos Ya!",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${dinAlternate.variable} ${roboto.variable} ${sequel100Black.variable}`}>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}