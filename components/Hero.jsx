import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";
import Reveal from "./Reveal";
import styles from "./Hero.module.css";

const COTIZA_MSG =
  "Hola ¡Afiliamos Ya!, quiero afiliarme a seguridad social como independiente. Autorizo que me contacten por este medio para mi cotización.";

const BULLETS = [
  {
    t: "Salud y pensión al día",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20.8 8.6a4.6 4.6 0 0 0-8.8-1.9 4.6 4.6 0 0 0-8.8 1.9c0 5.4 8.8 10.4 8.8 10.4s8.8-5 8.8-10.4Z" />
        <line x1="12" y1="7" x2="12" y2="13" />
        <line x1="9" y1="10" x2="15" y2="10" />
      </svg>
    ),
  },
  {
    t: "ARL que solo una agremiación puede dar",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    t: "Planilla y soporte cada mes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <path d="M8 13l2 2 4-4" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.photoWrap}>
        <Image
          src="/images/hero-independientes.png"
          alt=""
          fill
          priority
          className={styles.photo}
          sizes="100vw"
        />
      </div>
      <div className={styles.scrim} />

      <Reveal as="div" className={styles.text}>
        <span className={styles.eyebrow}>
          Seguridad social para independientes, dependientes y empresas
        </span>
        <h1 className={styles.h1}>
          Trabaja tranquilo.
          <br />
          <span className={styles.hl}>Con ARL de verdad.</span>
        </h1>
        <p className={styles.lede}>
          Contratistas, profesionales, comerciantes y conductores: salud, pensión y
          riesgos laborales al día, sin que tengas que estar pendiente. Tú pagas lo
          mismo de ley — nosotros gestionamos todo.
        </p>

        <ul className={styles.bullets}>
          {BULLETS.map((b) => (
            <li key={b.t}>
              <span className={styles.bulletIcon}>{b.icon}</span>
              {b.t}
            </li>
          ))}
        </ul>

        <div className={styles.ctaRow}>
          <WhatsAppButton mensaje={COTIZA_MSG} />
          <a className={styles.btnGhost} href="/calculadora">
            Calcular mi aporte
          </a>
        </div>
      </Reveal>
    </header>
  );
}
