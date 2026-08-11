'use client'

import { useState, useRef, useEffect } from 'react'
import { parsePhoneNumberFromString, getCountryCallingCode } from 'libphonenumber-js'

/**
 * Formulario de captura de leads de "¡Afiliamos Ya!".
 * Envía por fetch (POST) al endpoint seguro /api/leads, que inserta en Supabase
 * con la service_role key en el servidor (ninguna llave viaja al navegador).
 *
 * Teléfono internacional: selector de país con buscador (por defecto Colombia
 * +57) + número. Se valida con libphonenumber-js y se guarda en formato E.164
 * (ej. +573001234567).
 *
 * Reutiliza las clases globales de la landing (.field, .chk, .btn, .btn-wa) y
 * las variables de tema (--ink, --amber, --paper) para calzar con la calculadora.
 * Debe renderizarse dentro del <div className="ay"> de page.js.
 */

// Países disponibles (Colombia primero por defecto; resto para leads del exterior).
const COUNTRIES = [
  { code: 'CO', name: 'Colombia' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'ES', name: 'España' },
  { code: 'MX', name: 'México' },
  { code: 'CA', name: 'Canadá' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'PE', name: 'Perú' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'PA', name: 'Panamá' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'BR', name: 'Brasil' },
  { code: 'GB', name: 'Reino Unido' },
  { code: 'IT', name: 'Italia' },
  { code: 'FR', name: 'Francia' },
  { code: 'DE', name: 'Alemania' },
  { code: 'PT', name: 'Portugal' },
  { code: 'AU', name: 'Australia' },
]

// Bandera emoji a partir del código ISO de 2 letras (degrada a "CO" en Windows).
const flag = (cc) =>
  cc.replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
const dial = (cc) => getCountryCallingCode(cc)
// Normaliza para búsqueda sin acentos ni mayúsculas ("España" -> "espana").
const norm = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

/**
 * Selector de país personalizado (no <select> nativo) para poder mostrar:
 * - cerrado: compacto "🇨🇴 +57"
 * - abierto: buscador + lista con nombre completo "🇨🇴 Colombia (+57)"
 */
function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const boxRef = useRef(null)

  // Cerrar al hacer clic fuera.
  useEffect(() => {
    function onDocMouseDown(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  const sel = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0]
  const q = norm(query.trim())
  const lista = q
    ? COUNTRIES.filter(
        (c) =>
          norm(c.name).includes(q) ||
          norm(c.code).includes(q) ||
          ('+' + dial(c.code)).includes(q) ||
          dial(c.code).includes(q)
      )
    : COUNTRIES

  return (
    <div ref={boxRef} style={{ position: 'relative', flex: '0 0 auto' }}>
      {/* Botón cerrado: bandera + código (compacto), estilo .field */}
      <button
        type="button"
        className="field"
        aria-label="Código de país"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 116,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span>{flag(sel.code)}</span>
        <span>+{dial(sel.code)}</span>
        <span style={{ marginLeft: 'auto', opacity: 0.6, fontSize: '.7rem' }}>▾</span>
      </button>

      {/* Panel abierto: buscador + lista con nombres completos */}
      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 50,
            width: 280,
            background: '#12333a',
            border: '1px solid rgba(245,244,239,.18)',
            borderRadius: 12,
            boxShadow: '0 14px 34px rgba(0,0,0,.45)',
            padding: 8,
          }}
        >
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar país…"
            className="field"
            style={{ width: '100%', marginBottom: 6 }}
          />
          <div style={{ maxHeight: 240, overflowY: 'auto' }}>
            {lista.map((c) => {
              const activo = c.code === value
              return (
                <button
                  key={c.code}
                  type="button"
                  role="option"
                  aria-selected={activo}
                  onClick={() => {
                    onChange(c.code)
                    setOpen(false)
                    setQuery('')
                  }}
                  onMouseEnter={(e) => {
                    if (!activo) e.currentTarget.style.background = 'rgba(245,244,239,.08)'
                  }}
                  onMouseLeave={(e) => {
                    if (!activo) e.currentTarget.style.background = 'transparent'
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    textAlign: 'left',
                    background: activo ? 'rgba(242,167,27,.16)' : 'transparent',
                    color: activo ? 'var(--amber)' : 'var(--paper)',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    padding: '.55rem .6rem',
                    fontSize: '.95rem',
                    fontFamily: 'inherit',
                  }}
                >
                  <span>{flag(c.code)}</span>
                  <span style={{ flex: 1 }}>{c.name}</span>
                  <span style={{ opacity: 0.7 }}>+{dial(c.code)}</span>
                </button>
              )
            })}
            {lista.length === 0 && (
              <p style={{ color: 'rgba(245,244,239,.6)', fontSize: '.9rem', padding: '.55rem .6rem' }}>
                Sin resultados
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function LeadForm() {
  const [estado, setEstado] = useState('idle') // 'idle' | 'enviando' | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const [country, setCountry] = useState('CO') // Colombia por defecto
  const [numero, setNumero] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)

    const consentimiento = fd.get('consentimiento') === 'on'
    if (!consentimiento) {
      setErrorMsg('Debes autorizar el tratamiento de datos para continuar.')
      return
    }

    // Teléfono: se arma con el país elegido y se valida antes de enviar.
    const parsed = parsePhoneNumberFromString(numero || '', country)
    if (!parsed || !parsed.isValid()) {
      setErrorMsg('Ingresa un número de teléfono válido para el país seleccionado.')
      return
    }
    const telefono = parsed.number // formato E.164, ej. +573001234567

    const payload = {
      nombre: fd.get('nombre')?.trim(),
      telefono,
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
  // Opciones de los desplegables nativos: texto oscuro sobre blanco para contraste.
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
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Selector de país con buscador. Colombia (+57) por defecto. */}
            <CountrySelect value={country} onChange={setCountry} />
            {/* Número nacional; se combina con el país para formar el E.164. */}
            <input
              type="tel"
              inputMode="tel"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
              className="field"
              style={{ flex: 1 }}
              placeholder="300 000 0000"
            />
          </div>

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
