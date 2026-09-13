"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import styles from "./PremiumTrialModal.module.css";

const SHOW_DELAY_MS = 1500;
const MENSAJE =
  "Hola ¡Afiliamos Ya!, quiero obtener mi membresía Premium con el mes gratis de prueba.";

export default function PremiumTrialModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Oferta Premium">
        <button type="button" className={styles.close} aria-label="Cerrar" onClick={close}>
          ✕
        </button>

        <span className={styles.badge}>Oferta por tiempo limitado</span>

        <div className={styles.logo}>
          <span className={styles.logoTitle}>¡Afiliamos Ya!</span>
          <span className={styles.logoWord}>Premium</span>
        </div>

        <h2 className={styles.title}>Obtén tu primer mes gratis*</h2>
        <p className={styles.subtitle}>
          Deja tu Seguridad Social en manos de un experto, sin costo el primer mes.
        </p>

        <div className={styles.cta}>
          <WhatsAppButton mensaje={MENSAJE} variant="dark">
            Obtener membresía
          </WhatsAppButton>
        </div>

        <Link href="/terminos" target="_blank" className={styles.termsNote}>
          *Aplican términos y condiciones
        </Link>
      </div>
    </div>
  );
}
