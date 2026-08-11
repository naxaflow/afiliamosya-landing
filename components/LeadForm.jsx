'use client'

import { useState } from 'react'

/**
 * Formulario de captura de leads de "¡Afiliamos Ya!".
 * Envía por fetch (POST) al endpoint seguro /api/leads, que inserta en Supabase
 * con la service_role key en el servidor (ninguna llave viaja al navegador).
 *
 * Reutiliza las clases globales de la landing (.field, .chk, .btn, .btn-wa) y
 * las variables de tema (--ink, --amber, --paper) para calzar con la calculadora.
 * Debe renderizarse dentro del <div className="ay"> de page.js.
 */
export default function LeadForm() {
  const [estado, setEstado] = useState('idle') // 'idle' | 'enviando' | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const consentimiento = fd.get('consentimiento') === 'on'
    if (!consentimiento) {
      setErrorMsg('Debes autorizar el tratamiento de datos para continuar.')
      return
    }

    const payload = {
      nombre: fd.get('nombre')?.trim(),
      telefono: fd.get('telefono')?.trim(),
      actividad: fd.get('actividad')?.trim() || null,
      ingresos: fd.get('ingresos')?.trim() || null,
      modalidad: fd.get('modalidad') || null,
      mensaje: fd.get('mensaje')?.trim() || null,
      consentimiento: true,
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

  // Panel oscuro tipo .calc, centrado.
  const panelStyle = {
    background: 'var(--ink)',
    color: 'var(--paper)',
    borderRadius: 26,
    padding: 32,
    maxWidth: 560,
    margin: '0 auto',
  }
  const labelStyle = {
    display: 'block',
    fontSize: '.82rem',
    fontWeight: 700,
    letterSpacing: '.02em',
    color: 'rgba(245,244,239,.72)',
    margin: '18px 0 8px',
  }
  // Opciones del desplegable: texto oscuro sobre blanco para buen contraste.
  const optionStyle = { color: '#0f272d', background: '#ffffff' }

  if (estado === 'ok') {
    return (
      <section className="section" id="afiliate">
        <div className="wrap">
          <div style={{ ...panelStyle, textAlign: 'center' }}>
            <h2 style={{ color: 'var(--amber)' }}>¡Gracias! 🎉</h2>
            <p style={{ color: 'rgba(245,244,239,.82)', marginTop: 12 }}>
              Recibimos tus datos. Un asesor de ¡Afiliamos Ya! te contactará muy pronto.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section" id="afiliate">
      <div className="wrap">
        <form onSubmit={handleSubmit} style={panelStyle}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)' }}>Afíliate hoy</h2>
          <p style={{ color: 'rgba(245,244,239,.72)', margin: '10px 0 4px' }}>
            Déjanos tus datos y te contactamos.
          </p>

          <label style={labelStyle}>Nombre completo *</label>
          <input name="nombre" required className="field" placeholder="Tu nombre" />

          <label style={labelStyle}>Teléfono / WhatsApp *</label>
          <input name="telefono" required inputMode="tel" className="field" placeholder="300 000 0000" />

          <label style={labelStyle}>¿A qué te dedicas?</label>
          <input name="actividad" className="field" placeholder="Ej: comerciante, taxista…" />

          <label style={labelStyle}>Ingresos mensuales aprox.</label>
          <input name="ingresos" type="number" min="0" step="1000" className="field" placeholder="$" />

          <label style={labelStyle}>Modalidad *</label>
          <select name="modalidad" required defaultValue="" className="field">
            {/* Opciones con texto oscuro sobre fondo claro: el menú nativo se
                pinta sobre blanco, así que forzamos --ink para que se lean. */}
            <option value="" disabled style={optionStyle}>Selecciona…</option>
            <option value="colombia" style={optionStyle}>Estoy en Colombia</option>
            <option value="exterior" style={optionStyle}>Estoy en el exterior</option>
          </select>

          <label style={labelStyle}>Mensaje (opcional)</label>
          <textarea name="mensaje" rows={3} className="field" placeholder="Cuéntanos qué necesitas" />

          <label className="chk" style={{ alignItems: 'flex-start', marginTop: 20 }}>
            <input type="checkbox" name="consentimiento" required />
            <span>
              Autorizo el tratamiento de mis datos personales conforme a la{' '}
              <b style={{ color: 'var(--amber)' }}>Ley 1581 de 2012</b> y la política de
              privacidad de ¡Afiliamos Ya! *
            </span>
          </label>

          {errorMsg && (
            <p style={{ color: '#ff9b9b', fontSize: '.9rem', marginTop: 12 }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            className="btn btn-wa"
            style={{ width: '100%', justifyContent: 'center', marginTop: 18 }}
            disabled={estado === 'enviando'}
          >
            {estado === 'enviando' ? 'Enviando…' : 'Quiero afiliarme'}
          </button>
        </form>
      </div>
    </section>
  )
}
