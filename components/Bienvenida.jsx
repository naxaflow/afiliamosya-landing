"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Bienvenida.module.css";

export default function Bienvenida() {
  const photoRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.15, 80);
        if (photoRef.current) {
          photoRef.current.style.transform = `translateY(${offset}px)`;
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.bienvenida}>
      <div className={styles.photoWrap} ref={photoRef}>
        <Image
          src="/images/hero-home-team.jpg"
          alt=""
          fill
          priority
          className={styles.photo}
          sizes="100vw"
        />
      </div>
      <div className={styles.scrim} />
      <div className={styles.content}>
        <Image
          src="/logo-icon.png"
          alt=""
          width={140}
          height={140}
          className={`${styles.logo} ${styles.fadeIn1}`}
        />
        <h2 className={`${styles.titulo} ${styles.fadeIn2}`}>
          Bienvenido a
          <br />
          <span className={styles.hl}>¡Afiliamos Ya!</span>
        </h2>
        <p className={`${styles.sub} ${styles.fadeIn3}`}>Tu Seguridad Social, sin complicaciones.</p>
      </div>
      <div className={styles.scrollHint} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
