import Image from "next/image";
import Calculadora from "@/components/Calculadora";
import Reveal from "@/components/Reveal";
import styles from "@/components/CalculadoraPage.module.css";

export const metadata = {
  title: "Calculadora de aportes 2026",
  description:
    "Calcula tu aporte mensual de ley a salud, pensión, ARL y caja de compensación como independiente en Colombia, con los valores oficiales 2026.",
  openGraph: { url: "/calculadora", images: ["/og-image.png"] },
};

export default function CalculadoraPage() {
  return (
    <div className={styles.pageBg}>
      <div className={styles.pageBgFixed}>
        <Image
          src="/images/calculadora-page-bg-v2.jpg"
          alt=""
          fill
          priority
          className={styles.pageBgImg}
          sizes="100vw"
        />
        <div className={styles.pageBgScrim} />
      </div>

      <div className={styles.heroContent}>
        <Reveal as="div" className={styles.topPromo}>
          <span className={styles.topPromoTitle}>¿Atrasado con tu planilla? Nosotros te ayudamos</span>
          <span className={styles.topPromoText}>
            Corregimos novedades, ponemos al día periodos atrasados y resolvemos deudas
            en mora.
          </span>
        </Reveal>

        <Reveal as="div" className={styles.bannerInner}>
          <div>
            <span className={styles.eyebrow}>Calculadora 2026</span>
            <h1 className={styles.title}>Mira cuánto es tu aporte de ley</h1>
            <p className={styles.sub}>
              Cálculo con los valores oficiales 2026. Es lo que pagarías de todos
              modos como independiente — con nosotros, además, queda gestionado y
              con ARL.
            </p>
          </div>
          <div className={styles.badge}>
            <div className={styles.badgeNum}>2026</div>
            <div className={styles.badgeLabel}>Valores oficiales vigentes</div>
          </div>
        </Reveal>
      </div>

      <div className={styles.wrap}>
        <Reveal delay={150} as="div" className={styles.card}>
          <Calculadora showModalidad={false} showPensionProjection={false} />
        </Reveal>
      </div>
    </div>
  );
}
