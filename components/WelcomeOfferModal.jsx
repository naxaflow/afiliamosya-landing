"use client";

import { useEffect, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import CountrySelect from "./CountrySelect";
import leadStyles from "./LeadForm.module.css";
import styles from "./WelcomeOfferModal.module.css";

const SHOW_DELAY_MS = 1500;

export default function WelcomeOfferModal() {
  const [open, setOpen] = useState(false);
  const [estado, setEstado] = useState("idle"); // 'idle' | 'enviando' | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState("");
  const [country, setCountry] = useState("CO");
  const [numero, setNumero] = useState("");
  const [montadoEn] = useState(() => Date.now());

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

    const payload = {
      nombre: fd.get("nombre")?.trim(),
      telefono: parsed.number,
      correo: fd.get("correo")?.trim() || null,
      consentimiento: true,
      origen: "popup_descuento",
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

  if (!open) return null;

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Oferta de afiliación">
        <button type="button" className={styles.close} aria-label="Cerrar" onClick={close}>
          ✕
        </button>

        {estado === "ok" ? (
          <div style={{ textAlign: "center" }}>
            <h2 className={styles.thanksTitle}>¡Gracias! 🎉</h2>
            <p className={styles.thanksText}>
              Recibimos tus datos. Un asesor de ¡Afiliamos Ya! te contactará muy pronto para
              contarte los detalles de tu descuento.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className={styles.badge}>
              Oferta por
              <br />
              Tiempo Limitado
            </span>
            <h2 className={styles.title}>
              Afíliate hoy con descuento de hasta{" "}
              <span className={styles.titleAccent}>100%</span>
            </h2>
            <p className={styles.subtitle}>
              Déjanos tus datos y un asesor te contacta para contarte cómo acceder al descuento.
            </p>

            <input
              type="text"
              name="sitio_web"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            <label className={leadStyles.label}>Nombre completo *</label>
            <input name="nombre" required className={leadStyles.field} placeholder="Tu nombre" />

            <label className={leadStyles.label}>Teléfono / WhatsApp *</label>
            <div style={{ display: "flex", gap: 8 }}>
              <CountrySelect value={country} onChange={setCountry} />
              <input
                type="tel"
                inputMode="tel"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
                className={leadStyles.field}
                style={{ flex: 1 }}
                placeholder="300 000 0000"
              />
            </div>

            <label className={leadStyles.label}>Correo electrónico</label>
            <input type="email" name="correo" className={leadStyles.field} placeholder="tucorreo@ejemplo.com" />

            <label className={leadStyles.consent} style={{ color: "#fff" }}>
              <input type="checkbox" name="consentimiento" required />
              <span>
                Autorizo el tratamiento de mis datos personales conforme a la{" "}
                <b className={leadStyles.consentStrong}>Ley 1581 de 2012</b> y la política de
                privacidad de ¡Afiliamos Ya! *
              </span>
            </label>

            {errorMsg && (
              <p className={leadStyles.error} style={{ color: "#ff8a80" }}>
                {errorMsg}
              </p>
            )}

            <button type="submit" className={leadStyles.submit} disabled={estado === "enviando"}>
              {estado === "enviando" ? "Enviando…" : "Quiero mi descuento"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
