import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrustBar from "@/components/TrustBar";
import Reveal from "@/components/Reveal";
import homeStyles from "@/components/Home.module.css";
import styles from "@/components/ServicioPage.module.css";

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export default function ServicioPage({
  eyebrow,
  title,
  image,
  lede,
  servicios,
  closing,
  ctaTexto,
  ctaMensaje,
  ctaBoton = "Solicitar asesoría",
  imagePosition,
  titleColor,
  eyebrowColor,
  sectionMinHeight,
  showTrustBar = true,
  extra,
  ledeAfterExtra = false,
  heroBadge = false,
  ledeCentered = false,
  ledeColor,
  ledeMarginTop,
  ctaBoxMarginTop,
  listaMarginTop,
}) {
  const ledeStyle = {
    ...(image ? { marginTop: 0 } : undefined),
    ...(ledeCentered
      ? { textAlign: "center", marginLeft: "auto", marginRight: "auto", maxWidth: "none" }
      : undefined),
    ...(ledeColor ? { color: ledeColor } : undefined),
    ...(ledeMarginTop ? { marginTop: ledeMarginTop } : undefined),
  };
  const ledeP = (
    <p className={homeStyles.sub} style={ledeStyle}>
      {lede}
    </p>
  );
  return (
    <>
      {image && (
        <header className={styles.banner}>
          <Image
            src={image}
            alt=""
            fill
            priority
            className={styles.bannerPhoto}
            sizes="100vw"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div className={styles.bannerScrim} />
          {heroBadge && (
            <Reveal as="div" className={styles.heroBadge}>
              <span className={styles.heroBadgeTitle}>¡Afiliamos Ya!</span>
              <span className={styles.heroBadgeWord}>Premium</span>
            </Reveal>
          )}
          <Reveal as="div" className={styles.bannerContent}>
            <span
              className={styles.bannerEyebrow}
              style={eyebrowColor ? { color: eyebrowColor } : undefined}
            >
              {eyebrow}
            </span>
            <h1 className={styles.bannerTitle} style={titleColor ? { color: titleColor } : undefined}>
              {title}
            </h1>
          </Reveal>
        </header>
      )}

      {showTrustBar && <TrustBar />}

      <section
        className={homeStyles.section}
        style={sectionMinHeight ? { minHeight: sectionMinHeight } : undefined}
      >
        <Reveal>
          {!image && (
            <>
              <span className={homeStyles.eyebrow}>{eyebrow}</span>
              <h1 className={`${homeStyles.h2} ${styles.header}`}>{title}</h1>
            </>
          )}
          {ledeAfterExtra ? (
            <>
              {extra}
              {ledeP}
            </>
          ) : (
            <>
              {ledeP}
              {extra}
            </>
          )}
        </Reveal>

        <Reveal
          delay={150}
          as="ul"
          className={styles.lista}
          style={listaMarginTop ? { marginTop: listaMarginTop } : undefined}
        >
          {servicios.map((t) => (
            <li key={t}>
              <span className={styles.listaIcon}>
                <Check />
              </span>
              {t}
            </li>
          ))}
        </Reveal>

        {closing && (
          <Reveal delay={200} as="p" className={styles.closing}>
            {closing}
          </Reveal>
        )}

        <Reveal
          delay={250}
          className={styles.ctaBox}
          style={ctaBoxMarginTop ? { marginTop: ctaBoxMarginTop } : undefined}
        >
          <p>{ctaTexto}</p>
          <WhatsAppButton mensaje={ctaMensaje} className={styles.ctaBtn}>
            {ctaBoton}
          </WhatsAppButton>
        </Reveal>
      </section>
    </>
  );
}
