import Image from "next/image";
import Link from "next/link";
import { EMAIL, PHONE_DISPLAY, waLink } from "@/lib/site";
import styles from "./Footer.module.css";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.03.24-3.45-.72-2.9-1.16-4.77-4.13-4.92-4.32-.14-.2-1.17-1.56-1.17-2.98s.73-2.11 1-2.4c.24-.27.53-.34.71-.34.18 0 .35 0 .5.01.17.01.38-.06.6.45.24.56.8 1.95.87 2.1.07.14.11.31.02.5-.09.19-.14.3-.27.46-.14.17-.29.37-.41.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.37-.24.62-.14.26.09 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Image src="/logo-icon.png" alt="" width={26} height={26} />
          <span className={styles.brandName}>¡Afiliamos Ya!</span>
          <span className={styles.tagline}>Tu Seguridad Social, nuestra gestión.</span>
        </div>
        <div className={styles.legal}>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.contactos}>
          <a href={`mailto:${EMAIL}`}>✉️ {EMAIL}</a>
          <a
            href={waLink("Hola ¡Afiliamos Ya!, quiero más información.")}
            target="_blank"
            rel="noreferrer"
            className={styles.waContact}
          >
            <WhatsAppIcon /> {PHONE_DISPLAY}
          </a>
        </div>
        <div className={styles.handle}>@afiliamosya · afiliamosya.com</div>
      </div>
    </footer>
  );
}
