import Image from "next/image";
import ServicioPage from "@/components/ServicioPage";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrustBar from "@/components/TrustBar";
import Calculadora from "@/components/Calculadora";
import Reveal from "@/components/Reveal";
import homeStyles from "@/components/Home.module.css";
import styles from "@/components/ServicioPage.module.css";
import calcPageStyles from "@/components/CalculadoraPage.module.css";

export const metadata = {
  title: "Colombianos en el Exterior",
  description:
    "Cobertura de Salud para tu familia en Colombia y Plan Pensional para colombianos en el exterior, con aportes voluntarios conforme al Decreto 682 de 2014.",
  openGraph: { url: "/exterior" },
};

const SERVICIOS = [
  "Cobertura al Sistema de Salud para tu familia (padres, esposa(o) o hijos)",
  "Plan Pensional para quienes se fueron del país y quieren pensionarse en Colombia",
  "Aportes voluntarios a Pensión conforme al Decreto 682 de 2014",
  "Afiliación y continuidad de tu historia laboral",
  "Gestión completa desde el exterior, sin trámites presenciales",
  "Acompañamiento en español, por WhatsApp",
];

const SALUD_PUNTOS = [
  "Afiliación de padres, esposa(o) e hijos a tu EPS",
  "Orientación en traslados y novedades",
  "Gestión completa por WhatsApp, sin trámites presenciales",
];

const PENSION_PUNTOS = [
  "Aportes voluntarios conforme al Decreto 682 de 2014",
  "Continuidad de tu historia laboral en Colombia",
  "Acompañamiento internacional: Estados Unidos, España y otros países",
];

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export default function Page() {
  return (
    <>
      <ServicioPage
        eyebrow="Colombianos en el Exterior"
        title="Sigue construyendo tu futuro en Colombia, desde donde estés"
        image="/images/exterior-hero-v2.jpg"
        imagePosition="center 70%"
        titleColor="#fff"
        eyebrowColor="#FF7700"
        sectionMinHeight="760px"
        lede="Si resides en el exterior, puedes cubrir a tu familia en Colombia y seguir aportando a tu pensión, sin necesidad de estar trabajando en el país."
        servicios={SERVICIOS}
        closing="No necesitas estar en Colombia para proteger a tu familia y construir tu futuro."
        ctaTexto="¿Vives en el exterior y quieres cubrir a tu familia o seguir aportando a tu pensión? Déjanos tus datos."
        ctaMensaje="Hola ¡Afiliamos Ya!, vivo en el exterior y quiero información sobre Salud familiar y mi Plan Pensional. Autorizo que me contacten por este medio."
        ctaBoton="Solicitar información"
        showTrustBar={false}
      />

      <section className={styles.serviceSection}>
        <Image
          src="/images/exterior-salud-bg.jpg"
          alt=""
          fill
          className={styles.serviceBg}
          sizes="100vw"
          style={{ transform: "scale(1.4) translateX(9%)" }}
        />
        <div className={styles.serviceScrim} />
        <Reveal as="div" className={styles.serviceContent}>
          <span className={styles.serviceEyebrow}>Servicio</span>
          <h2 className={styles.serviceTitle}>Cobertura de Salud para tu familia</h2>
          <p className={styles.serviceDesc}>
            Aunque tú vivas en el exterior, tu familia en Colombia puede
            quedar cubierta por el Sistema de Salud. Gestionamos la
            afiliación de tus padres, tu esposa(o) o tus hijos, con
            seguimiento a novedades y traslados — todo resuelto por
            WhatsApp, sin que tengas que estar presente en el país.
          </p>
          <ul className={styles.serviceList}>
            {SALUD_PUNTOS.map((t) => (
              <li key={t}>
                <Check />
                {t}
              </li>
            ))}
          </ul>
          <WhatsAppButton
            mensaje="Hola ¡Afiliamos Ya!, vivo en el exterior y quiero cubrir a mi familia con el Sistema de Salud. Autorizo que me contacten por este medio."
            className={styles.serviceCta}
          >
            Quiero cubrir a mi familia
          </WhatsAppButton>
        </Reveal>
      </section>

      <TrustBar />

      <section className={styles.serviceSection} style={{ minHeight: "646px" }}>
        <Image
          src="/images/exterior-pension-bg.jpg"
          alt=""
          fill
          className={styles.serviceBg}
          sizes="100vw"
        />
        <div className={`${styles.serviceScrim} ${styles.serviceScrimRight}`} />
        <Reveal as="div" className={styles.serviceContent}>
          <div className={styles.serviceInnerRight}>
            <span className={styles.serviceEyebrow}>Servicio</span>
            <h2 className={styles.serviceTitle}>Plan Pensional</h2>
            <p className={styles.serviceDesc}>
              El acompañamiento es internacional: Estados Unidos, España y
              otros países. Si te fuiste de Colombia y te gustaría
              pensionarte más adelante, te ayudamos a seguir cotizando
              conforme al Decreto 682 de 2014, con toda la gestión resuelta
              por WhatsApp.
            </p>
            <ul className={styles.serviceList}>
              {PENSION_PUNTOS.map((t) => (
                <li key={t}>
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
            <WhatsAppButton
              mensaje="Hola ¡Afiliamos Ya!, vivo en el exterior y quiero información sobre mi Plan Pensional. Autorizo que me contacten por este medio."
              className={styles.serviceCta}
            >
              Quiero mi Plan Pensional
            </WhatsAppButton>
          </div>
        </Reveal>
      </section>

      <TrustBar message={<>Tu futuro no tiene fronteras: sigue construyendo tu <em>pensión</em>, estés donde estés.</>} />

      <section className={styles.serviceSection}>
        <Image
          src="/images/exterior-hero.jpg"
          alt=""
          fill
          className={styles.serviceBg}
          sizes="100vw"
          style={{ objectPosition: "center 42%" }}
        />
        <div className={`${styles.serviceScrim} ${styles.serviceScrimFull}`} />
        <div className={styles.serviceContent}>
          <Reveal>
            <span className={homeStyles.eyebrow} style={{ color: "var(--color-primary)" }}>
              Plan Pensional
            </span>
            <h2 className={homeStyles.h2} style={{ color: "#fff" }}>
              Simula tu pensión desde el exterior
            </h2>
            <p className={homeStyles.sub} style={{ color: "rgba(255,255,255,0.75)" }}>
              Calcula tu aporte voluntario a Pensión y proyecta con cuánto te
              pensionarías si sigues cotizando desde donde estás.
            </p>
          </Reveal>
          <div style={{ marginTop: 32 }}>
            <Reveal delay={150} as="div" className={calcPageStyles.card}>
              <Calculadora defaultExterior showAportes={false} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
