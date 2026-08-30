"use client";

import { useState } from "react";
import Image from "next/image";
import { waLink } from "@/lib/site";
import styles from "./ChatWidget.module.css";

const PREGUNTAS = [
  {
    q: "¿Qué es ARL colectiva?",
    a: "Es la protección frente a riesgos laborales que solo una agremiación autorizada por el Ministerio de Salud puede darte de forma colectiva — ninguna app de autoliquidación puede ofrecerla.",
  },
  {
    q: "¿Cuánto pago al mes?",
    a: "Pagas tus aportes de ley (los mismos de siempre) más una cuota de gestión por afiliarte y hacer seguimiento cada mes. Te damos el valor exacto por WhatsApp.",
  },
  {
    q: "¿Cómo me afilio?",
    a: "Nos escribes por WhatsApp con tus datos básicos, te cotizamos tu aporte exacto, y quedas afiliado el mismo día con tu planilla y soporte mensual.",
  },
];

export default function ChatWidget() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    { from: "bot", text: "¡Hola! 👋 Soy el asistente de ¡Afiliamos Ya! ¿En qué te puedo ayudar hoy?" },
  ]);
  const [respondidas, setRespondidas] = useState([]);
  const [input, setInput] = useState("");

  function preguntar(i) {
    const p = PREGUNTAS[i];
    setMensajes((m) => [...m, { from: "user", text: p.q }, { from: "bot", text: p.a }]);
    setRespondidas((r) => [...r, i]);
  }

  function enviarLibre(e) {
    e.preventDefault();
    const texto = input.trim();
    if (!texto) return;
    window.open(waLink(texto), "_blank", "noreferrer");
    setInput("");
  }

  if (!abierto) {
    return (
      <button type="button" className={styles.bubble} onClick={() => setAbierto(true)} aria-label="Abrir asistente">
        <Image src="/logo-white.png" alt="" width={32} height={27} className={styles.bubbleLogo} />
        <span className={styles.badge} aria-hidden="true" />
      </button>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <Image src="/logo-icon.png" alt="" width={26} height={26} className={styles.headerLogo} />
        <div className={styles.headerText}>
          <span className={styles.headerName}>Asistente ¡Afiliamos Ya!</span>
          <span className={styles.headerStatus}>
            <span className={styles.dot} /> En línea
          </span>
        </div>
        <button type="button" className={styles.close} onClick={() => setAbierto(false)} aria-label="Cerrar">
          ✕
        </button>
      </div>

      <div className={styles.body}>
        {mensajes.map((m, i) => (
          <div key={i} className={m.from === "bot" ? styles.bubbleBot : styles.bubbleUser}>
            {m.text}
          </div>
        ))}

        {respondidas.length < PREGUNTAS.length && (
          <div className={styles.pills}>
            {PREGUNTAS.map((p, i) =>
              respondidas.includes(i) ? null : (
                <button key={p.q} type="button" className={styles.pill} onClick={() => preguntar(i)}>
                  {p.q}
                </button>
              )
            )}
          </div>
        )}

        <a
          className={styles.pillAsesor}
          href={waLink("Hola ¡Afiliamos Ya!, quiero hablar con un asesor.")}
          target="_blank"
          rel="noreferrer"
        >
          💬 Hablar con un asesor
        </a>
      </div>

      <form className={styles.inputRow} onSubmit={enviarLibre}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta…"
          aria-label="Escribe tu pregunta"
        />
        <button type="submit" aria-label="Enviar por WhatsApp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}
