"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";
import WhatsAppButton from "./WhatsAppButton";
import styles from "./Nav.module.css";

const MENSAJE_WA = "Hola Wilmer!, Estoy listo para empezar a cotizar con Afiliamos Ya!";

export default function Nav() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} onClick={() => setAbierto(false)}>
          <Image src="/logo-white.png" alt="" width={44} height={37} priority />
          Afiliamos Ya!
        </Link>

        <div className={styles.tabs}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? styles.tabOn : styles.tab}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <WhatsAppButton mensaje={MENSAJE_WA} variant="dark" className={styles.cta} />

        <button
          type="button"
          className={styles.toggle}
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {abierto && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? styles.mobileTabOn : styles.mobileTab}
              onClick={() => setAbierto(false)}
            >
              {item.label}
            </Link>
          ))}
          <WhatsAppButton mensaje={MENSAJE_WA} variant="dark" className={styles.mobileCta} />
        </div>
      )}
    </nav>
  );
}
