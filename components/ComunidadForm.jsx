"use client";

import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import CountrySelect from "./CountrySelect";
import styles from "./LeadForm.module.css";

export default function ComunidadForm({
  titulo = "Únete a la comunidad",
  highlight,
  descripcion = "Déjanos tus datos y te avisamos primero.",
  boton = "Unirme a la comunidad",
  className,
}) {
  const [estado, setEstado] = useState("idle"); // 'idle' | 'enviando' | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState("");
  const [country, setCountry] = useState("CO");
  const [numero, setNumero] = useState("");
  const [montadoEn] = useState(() => Date.now());

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);

    const consentimiento = fd.get("consentimiento") === "on";
    if (!consentimiento) {
      setErrorMsg("Debes autorizar el tratamiento de datos para continuar.");
      return;
    }

    const parsed = parsePhoneNumberFromString(numero || "", country);
    if (!parsed || !parsed.isValid()) {
      setErrorMsg("Ingresa un número de teléfono válido para el país seleccionado.");
      return;
    }
    const telefono = parsed.number;

    const correo = fd.get("correo")?.trim();
    if (!correo || !correo.includes("@")) {
      setErrorMsg("Ingresa un correo válido.");
      return;
    }

    const payload = {
      nombre: fd.get("nombre")?.trim(),
      telefono,
      correo,
      consentimiento: true,
      origen: "comunidad",
      sitio_web: fd.get("sitio_web") || "",
      montado_en: montadoEn,
    };

    setEstado("enviando");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Error al enviar.");
      }
      setEstado("ok");
    } catch (err) {
      setEstado("error");
      setErrorMsg(err?.message || "No pudimos registrar tus datos. Intenta de nuevo.");
    }
  }

  if (estado === "ok") {
    return (
      <div className={`${styles.panel} ${styles.panelOk} ${className || ""}`}>
        <h2 className={styles.thanksTitle}>¡Listo! 🎉</h2>
        <p className={styles.thanksText}>
          Ya eres parte de la comunidad ¡Afiliamos Ya! Te avisaremos primero de
          contenido, recordatorios y beneficios exclusivos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.panel} ${className || ""}`}>
      <h2 className={styles.title}>{titulo}</h2>
      {highlight && <p className={styles.highlight}>{highlight}</p>}
      <p className={styles.subtitle}>{descripcion}</p>

      <input
        type="text"
        name="sitio_web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <label className={styles.label}>Nombre completo *</label>
      <input name="nombre" required className={styles.field} placeholder="Tu nombre" />

      <label className={styles.label}>Número de WhatsApp *</label>
      <div style={{ display: "flex", gap: 8 }}>
        <CountrySelect value={country} onChange={setCountry} />
        <input
          type="tel"
          inputMode="tel"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
          className={styles.field}
          style={{ flex: 1 }}
          placeholder="300 000 0000"
        />
      </div>

      <label className={styles.label}>Correo *</label>
      <input
        type="email"
        name="correo"
        required
        className={styles.field}
        placeholder="tucorreo@ejemplo.com"
      />

      <label className={styles.consent}>
        <input type="checkbox" name="consentimiento" required />
        <span>
          Autorizo el tratamiento de mis datos personales conforme a la{" "}
          <b className={styles.consentStrong}>Ley 1581 de 2012</b> y la política de
          privacidad de ¡Afiliamos Ya! *
        </span>
      </label>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}

      <button type="submit" className={styles.submit} disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : boton}
      </button>
    </form>
  );
}
