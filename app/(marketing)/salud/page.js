import Image from "next/image";
import ServicioPage from "@/components/ServicioPage";
import WhatsAppButton from "@/components/WhatsAppButton";
import styles from "@/components/ServicioPage.module.css";

export const metadata = {
  title: "Salud",
  description:
    "Afiliación, traslados, reingresos y novedades ante tu EPS. Acompañamiento en Salud para independientes y dependientes.",
  openGraph: { url: "/salud", images: ["/og-image.png"] },
};

const EPS_LOGOS = [
  { src: "/images/eps/nueva-eps.png", alt: "Nueva EPS", w: 568, h: 240 },
  { src: "/images/eps/mutual-ser.png", alt: "Mutual Ser", w: 383, h: 276 },
  { src: "/images/eps/famisanar.png", alt: "Famisanar", w: 962, h: 211 },
  { src: "/images/eps/coosalud.png", alt: "Coosalud", w: 388, h: 97 },
  { src: "/images/eps/compensar.png", alt: "Compensar EPS", w: 517, h: 150 },
  { src: "/images/eps/capital-salud.png", alt: "Capital Salud", w: 1443, h: 635 },
  { src: "/images/eps/salud-total.png", alt: "Salud Total", w: 776, h: 183 },
  { src: "/images/eps/aliansalud.png", alt: "Aliansalud", w: 478, h: 139 },
  { src: "/images/eps/sanitas.png", alt: "Sanitas", w: 568, h: 153 },
  { src: "/images/eps/salud-mia.png", alt: "Salud Mía", w: 340, h: 173 },
];

const SERVICIOS = [
  "Afiliaciones a EPS",
  "Traslados de EPS",
  "Reingresos",
  "Novedades",
  "Inclusión de beneficiarios, cuando corresponda",
  "Gestión relacionada con aportes a Salud",
];

export default function Page() {
  return (
    <ServicioPage
      eyebrow="Salud"
      title="Afiliación y gestión en Salud"
      image="/images/salud-hero.jpg"
      titleColor="#fff"
      eyebrowColor="#FF7700"
      imagePosition="center 15%"
      lede="La Salud es uno de los componentes fundamentales del Sistema de Seguridad Social. En Afiliamos Ya brindamos acompañamiento en procesos relacionados con la afiliación y gestión ante las EPS, de acuerdo con la situación particular de cada persona."
      ledeColor="var(--color-ink)"
      ledeMaxWidth="none"
      ledeMarginTop="-0.3in"
      sectionMinHeight="680px"
      servicios={SERVICIOS}
      listaMarginTop="calc(20px + 0.15in)"
      listaPaddingTop="0.3in"
      closing="Te ayudamos a entender y gestionar correctamente tu afiliación."
      ctaTexto="¿Necesitas gestionar tu afiliación a Salud? Déjanos tus datos y uno de nuestros asesores se pondrá en contacto contigo."
      ctaMensaje="Hola ¡Afiliamos Ya!, quiero información sobre mi afiliación a Salud (EPS). Autorizo que me contacten por este medio."
      ctaBoton="Solicitar información"
      extraSection={
        <>
          <h2 className={styles.trustTitle}>
            Más de <span className={styles.trustTitleAccent}>25 años</span> respaldando la
            tranquilidad
            <br />
            y el bienestar de los <span className={styles.trustTitleAccent}>colombianos</span>
          </h2>
          <p className={styles.trustText}>
            En ¡Afiliamos Ya!, somos líderes en consultoría y gestión de seguridad
            social en Colombia. Gracias a nuestra sólida trayectoria y a una red
            estratégica de convenios corporativos, facilitamos de manera ágil, legal
            y segura el proceso de vinculación al sistema de salud. Ofrecemos
            asesoría integral y gestionamos de principio a fin la afiliación de
            trabajadores independientes, empresas, empleados y familias a todas y
            cada una de las principales EPS autorizadas del país.
          </p>
          <ul className={styles.epsLogos}>
            {EPS_LOGOS.map((l) => (
              <li key={l.src}>
                <Image src={l.src} alt={l.alt} width={l.w} height={l.h} className={styles.epsLogoImg} />
              </li>
            ))}
          </ul>
          <p className={styles.epsNote}>
            ¡Y muchas más opciones a <span className={styles.epsNoteAccent}>nivel nacional</span>,
            incluyendo EPS Indígenas (<span className={styles.epsNoteAccent}>EPSI</span>) y{" "}
            <span className={styles.epsNoteAccent}>regímenes especiales</span>!
          </p>
          <p className={styles.trustText}>
            Olvídese de las filas, los trámites confusos y las demoras. Con nuestro acompañamiento
            experto, usted y sus beneficiarios contarán con el respaldo de la EPS que mejor se
            adapte a sus necesidades y ubicación geográfica.
          </p>
          <div className={styles.epsCtaWrap}>
            <WhatsAppButton mensaje="Hola ¡Afiliamos Ya!, quiero más información sobre las EPS disponibles y el proceso de afiliación en Salud.">
              Más información
            </WhatsAppButton>
          </div>
        </>
      }
    />
  );
}
