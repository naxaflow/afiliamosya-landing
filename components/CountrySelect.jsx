"use client";

import { useState, useRef, useEffect } from "react";
import { getCountryCallingCode } from "libphonenumber-js";
import styles from "./LeadForm.module.css";

export const COUNTRIES = [
  { code: "CO", name: "Colombia" },
  { code: "US", name: "Estados Unidos" },
  { code: "ES", name: "España" },
  { code: "MX", name: "México" },
  { code: "CA", name: "Canadá" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Perú" },
  { code: "EC", name: "Ecuador" },
  { code: "VE", name: "Venezuela" },
  { code: "PA", name: "Panamá" },
  { code: "CR", name: "Costa Rica" },
  { code: "GT", name: "Guatemala" },
  { code: "DO", name: "República Dominicana" },
  { code: "BO", name: "Bolivia" },
  { code: "PY", name: "Paraguay" },
  { code: "UY", name: "Uruguay" },
  { code: "BR", name: "Brasil" },
  { code: "GB", name: "Reino Unido" },
  { code: "IT", name: "Italia" },
  { code: "FR", name: "Francia" },
  { code: "DE", name: "Alemania" },
  { code: "PT", name: "Portugal" },
  { code: "AU", name: "Australia" },
];

const flag = (cc) => cc.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
const dial = (cc) => getCountryCallingCode(cc);
const norm = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef(null);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const sel = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];
  const q = norm(query.trim());
  const lista = q
    ? COUNTRIES.filter(
        (c) =>
          norm(c.name).includes(q) ||
          norm(c.code).includes(q) ||
          ("+" + dial(c.code)).includes(q) ||
          dial(c.code).includes(q)
      )
    : COUNTRIES;

  return (
    <div ref={boxRef} className={styles.countryBox}>
      <button
        type="button"
        className={styles.countryButton}
        aria-label="Código de país"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{flag(sel.code)}</span>
        <span>+{dial(sel.code)}</span>
        <span className={styles.countryCaret}>▾</span>
      </button>

      {open && (
        <div role="listbox" className={styles.countryPanel}>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar país…"
            className={styles.field}
            style={{ width: "100%", marginBottom: 6 }}
          />
          <div className={styles.countryList}>
            {lista.map((c) => {
              const activo = c.code === value;
              return (
                <button
                  key={c.code}
                  type="button"
                  role="option"
                  aria-selected={activo}
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={activo ? styles.countryOptionOn : styles.countryOption}
                >
                  <span>{flag(c.code)}</span>
                  <span style={{ flex: 1 }}>{c.name}</span>
                  <span style={{ opacity: 0.6 }}>+{dial(c.code)}</span>
                </button>
              );
            })}
            {lista.length === 0 && <p className={styles.noResults}>Sin resultados</p>}
          </div>
        </div>
      )}
    </div>
  );
}
