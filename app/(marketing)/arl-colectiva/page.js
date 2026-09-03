import ServicioPage from "@/components/ServicioPage";
import Reveal from "@/components/Reveal";
import styles from "@/components/ServicioPage.module.css";

export const metadata = {
  title: "ARL Colectiva",
  description:
    "ARL colectiva real a través de una agremiación autorizada por el Ministerio de Salud — algo que ninguna app de autoliquidación puede ofrecer.",
  openGraph: { url: "/arl-colectiva" },
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
      lede="La ARL – Administradora de Riesgos Laborales tiene como finalidad gestionar la protección frente a los riesgos derivados de las actividades laborales. En Afiliamos Ya acompañamos los procesos de afiliación a ARL para trabajadores y personas independientes, de acuerdo con la actividad económica y las condiciones aplicables."
      sectionMinHeight="680px"
      servicios={SERVICIOS}
      closing="La protección frente a los riesgos laborales comienza con una correcta afiliación."
      ctaTexto="¿Necesitas ARL colectiva real? Déjanos tus datos y uno de nuestros asesores se pondrá en contacto contigo."
      ctaMensaje="Hola ¡Afiliamos Ya!, quiero información sobre mi afiliación a ARL colectiva. Autorizo que me contacten por este medio."
      ctaBoton="Solicitar información"
      extra={
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
      }
    />
  );
}
