"use client";

import { useEffect } from "react";

/**
 * Al refrescar la página, los navegadores por defecto restauran la
 * posición de scroll donde estabas antes del refresh. Esto lo desactiva y
 * fuerza el scroll al top de la pestaña que se está recargando.
 */
export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
