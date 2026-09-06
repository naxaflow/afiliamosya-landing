import Image from "next/image";
import ServicioPage from "@/components/ServicioPage";
import Reveal from "@/components/Reveal";
import styles from "@/components/ServicioPage.module.css";

const ARL_LOGOS = [
  { src: "/images/arl/axa-colpatria.png", alt: "Axa Colpatria", w: 444, h: 237 },
  { src: "/images/arl/sura.png", alt: "Sura", w: 893, h: 335 },
  { src: "/images/arl/equidad.png", alt: "Equidad Seguros", w: 1841, h: 696 },
  { src: "/images/arl/seguros-bolivar.png", alt: "Seguros Bolívar", w: 595, h: 179 },
  { src: "/images/arl/positiva.png", alt: "Positiva Compañía de Seguros", w: 298, h: 80 },
];

export const metadata = {
  title: "ARL Colectiva",
  description:
    "ARL colectiva real a través de una agremiación autorizada por el Ministerio de Salud — algo que ninguna app de autoliquidación puede ofrecer.",
  openGraph: { url: "/arl-colectiva", images: ["/og-image.png"] },
};

const SERVICIOS = [
  "Afiliación a ARL",
  "Clasificación de actividad y riesgo",
  "Novedades de afiliación",
  "Gestión para trabajadores dependientes",
  "Gestión para independientes",
];

export default function Page() {
  return (
    <ServicioPage
      eyebrow="ARL Colectiva"
      title="Protección frente a Riesgos Laborales"
      image="/images/arl-hero.jpg"
      titleColor="#fff"
      eyebrowColor="#FF7700"
      ledeTitle={
        <>
          Administradora de <span className={styles.trustTitleAccent}>Riesgos</span> Laborales
        </>
      }
      ledeTextMarginTop="calc(14px + 0.2in)"
      lede={`La ARL (Administradora de Riesgos Laborales) tiene como finalidad proteger a los trabajadores frente a los riesgos derivados de sus actividades laborales, cubriendo accidentes de trabajo y enfermedades de origen profesional.

En ¡Afiliamos Ya! acompañamos el proceso de afiliación a ARL para trabajadores dependientes e independientes, ajustando la cobertura a la actividad económica y las condiciones aplicables a cada caso — con el respaldo de una agremiación autorizada por el Ministerio de Salud.`}
      ledeColor="var(--color-ink)"
      ledeCentered
      sectionMinHeight="680px"
      servicios={SERVICIOS}
      listaMarginTop="calc(20px + 0.3in)"
      closing="La protección frente a los riesgos laborales comienza con una correcta afiliación."
      closingColor="var(--color-ink)"
      closingCentered
      closingMarginTop="calc(24px + 0.15in)"
      ctaTexto="¿Necesitas ARL colectiva real? Déjanos tus datos y uno de nuestros asesores se pondrá en contacto contigo."
      ctaMensaje="Hola ¡Afiliamos Ya!, quiero información sobre mi afiliación a ARL colectiva. Autorizo que me contacten por este medio."
      ctaBoton="Solicitar información"
      extra={
        <>
          <ul className={styles.epsLogos}>
            {ARL_LOGOS.map((l, i) => (
              <li key={`${l.src}-${i}`}>
                <Image src={l.src} alt={l.alt} width={l.w} height={l.h} className={styles.epsLogoImg} />
              </li>
            ))}
          </ul>
          <Reveal delay={150} as="div" className={styles.calloutDark}>
            <span className={styles.icon}>◆</span>
            <div>
              <h3>La ARL no la da cualquiera</h3>
              <p>
                Ninguna app de autoliquidación puede afiliarte a riesgos laborales.
                Operamos a través de una agremiación autorizada por el Ministerio de
                Salud — la única figura que puede darte ARL colectiva. Es el
                diferenciador legal central de ¡Afiliamos Ya!, con más de 20 años
                protegiendo independientes.
              </p>
            </div>
          </Reveal>
        </>
      }
    />
  );
}
