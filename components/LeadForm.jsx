'use client'

import { useState } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { SMMLV } from '@/lib/calculadora'
import CountrySelect from './CountrySelect'
import styles from './LeadForm.module.css'

/**
 * Formulario de captura de leads de "¡Afiliamos Ya!".
 * Envía por fetch (POST) al endpoint seguro /api/leads, que inserta en Supabase
 * con la service_role key en el servidor (ninguna llave viaja al navegador).
 *
 * Teléfono internacional: selector de país con buscador (por defecto Colombia
 * +57) + número. Se valida con libphonenumber-js y se guarda en formato E.164
 * (ej. +573001234567).
 *
 * `origen` identifica desde qué página del sitio se envió el lead (home,
 * calculadora, contacto, independientes, ...) — ver lib/origenes.js.
 */

export default function LeadForm({ origen = 'home', titulo = 'Afíliate hoy', className }) {
  const [estado, setEstado] = useState('idle') // 'idle' | 'enviando' | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const [country, setCountry] = useState('CO')
  const [numero, setNumero] = useState('')
  const [ingresos, setIngresos] = useState(String(SMMLV))
  // Anti-spam: hora de montaje del formulario. Un envío en menos de ~1.5s
  // desde que se pintó el formulario es casi con certeza un bot.
  const [montadoEn] = useState(() => Date.now())

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)

    const consentimiento = fd.get('consentimiento') === 'on'
    if (!consentimiento) {
      setErrorMsg('Debes autorizar el tratamiento de datos para continuar.')
      return
    }

    const parsed = parsePhoneNumberFromString(numero || '', country)
    if (!parsed || !parsed.isValid()) {
      setErrorMsg('Ingresa un número de teléfono válido para el país seleccionado.')
      return
    }
    const telefono = parsed.number

    if (ingresos && Number(ingresos) < SMMLV) {
      setErrorMsg('Los ingresos no pueden ser menores al salario mínimo ($1.750.905).')
      return
    }

    const payload = {
      nombre: fd.get('nombre')?.trim(),
      telefono,
      actividad: fd.get('actividad')?.trim() || null,
      ingresos: ingresos || null,
      modalidad: fd.get('modalidad') || null,
      mensaje: fd.get('mensaje')?.trim() || null,
      consentimiento: true,
      origen,
      // Campos de anti-spam — ver validación en app/api/leads/route.js.
      sitio_web: fd.get('sitio_web') || '',
      montado_en: montadoEn,
    }

    setEstado('enviando')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Error al enviar.')
      }
      setEstado('ok')
    } catch (err) {
      setEstado('error')
      setErrorMsg(err?.message || 'No pudimos registrar tus datos. Intenta de nuevo.')
    }
  }

  if (estado === 'ok') {
    return (
      <div className={`${styles.panel} ${styles.panelOk} ${className || ''}`}>
        <h2 className={styles.thanksTitle}>¡Gracias! 🎉</h2>
        <p className={styles.thanksText}>
          Recibimos tus datos. Un asesor de ¡Afiliamos Ya! te contactará muy pronto.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.panel} ${className || ''}`}>
      <h2 className={styles.title}>{titulo}</h2>
      <p className={styles.subtitle}>Déjanos tus datos y te contactamos.</p>

      {/* Honeypot: invisible para personas, atractivo para bots que autocompletan
          todos los campos de un formulario. Si llega con valor, se descarta
          silenciosamente en el servidor. */}
      <input
        type="text"
        name="sitio_web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <label className={styles.label}>Nombre completo *</label>
      <input name="nombre" required className={styles.field} placeholder="Tu nombre" />

      <label className={styles.label}>Teléfono / WhatsApp *</label>
      <div style={{ display: 'flex', gap: 8 }}>
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

      <label className={styles.label}>¿A qué te dedicas?</label>
      <input name="actividad" className={styles.field} placeholder="Ej: comerciante, taxista…" />

      <label className={styles.label}>Ingresos mensuales aprox.</label>
      <div style={{ position: 'relative' }}>
        <span className={styles.currencyPrefix}>$</span>
        <input
          type="text"
          inputMode="numeric"
          aria-label="Ingresos mensuales aproximados en pesos"
          value={ingresos ? new Intl.NumberFormat('es-CO').format(Number(ingresos)) : ''}
          onChange={(e) => setIngresos(e.target.value.replace(/\D/g, ''))}
          className={styles.field}
          style={{ paddingLeft: 28 }}
          placeholder="1.750.905"
        />
      </div>

      <label className={styles.label}>Modalidad *</label>
      <select name="modalidad" required defaultValue="" className={styles.field}>
        <option value="" disabled>Selecciona…</option>
        <option value="colombia">Estoy en Colombia</option>
        <option value="exterior">Estoy en el exterior</option>
      </select>

      <label className={styles.label}>Mensaje (opcional)</label>
      <textarea name="mensaje" rows={3} className={styles.field} placeholder="Cuéntanos qué necesitas" />

      <label className={styles.consent}>
        <input type="checkbox" name="consentimiento" required />
        <span>
          Autorizo el tratamiento de mis datos personales conforme a la{' '}
          <b className={styles.consentStrong}>Ley 1581 de 2012</b> y la política de
          privacidad de ¡Afiliamos Ya! *
        </span>
      </label>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}

      <button type="submit" className={styles.submit} disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Quiero afiliarme'}
      </button>
    </form>
  )
}
