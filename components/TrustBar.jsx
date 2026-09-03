import Reveal from "./Reveal";
import styles from "./TrustBar.module.css";

const TRUST_ITEMS = [
  {
    t: "Seguridad",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    t: "Respaldo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
      </svg>
    ),
  },
  {
    t: "Tranquilidad",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20s-7-4.35-9.5-8.5C.5 8 3 4.5 6.5 4.5c2 0 3.5 1.2 5.5 3.2 2-2 3.5-3.2 5.5-3.2 3.5 0 6 3.5 4 7-2.5 4.15-9.5 8.5-9.5 8.5z" />
      </svg>
    ),
  },
  {
    t: "Experiencia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.5 6 21l6-3 6 3-2.5-8.5" />
      </svg>
    ),
  },
];

export default function TrustBar({ message }) {
  return (
    <div className={styles.trustBar}>
      <Reveal as="div" className={styles.inner}>
        {message ? (
          <p className={styles.message}>{message}</p>
        ) : (
          TRUST_ITEMS.map((i) => (
            <div className={styles.item} key={i.t}>
              {i.icon}
              {i.t}
            </div>
          ))
        )}
      </Reveal>
    </div>
  );
}
