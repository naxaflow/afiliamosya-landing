"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

/**
 * Envuelve contenido y lo hace aparecer con fade-in + desplazamiento hacia
 * arriba cuando entra en pantalla al hacer scroll — el mismo efecto que ya
 * tenían el logo/título del hero de Home y los links del header, pero
 * disparado por scroll (IntersectionObserver) en vez de solo al cargar,
 * para que funcione en contenido que empieza fuera de la vista.
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ""} ${className || ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
