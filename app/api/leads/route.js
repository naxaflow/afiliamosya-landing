import { NextResponse } from 'next/server'
import { esOrigenValido } from '@/lib/origenes'
import { upsertLeadConDedup } from '@/lib/leads'

// Este handler corre SOLO en el servidor (Node), nunca en el navegador.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MODALIDADES = new Set(['colombia', 'exterior'])

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  // --- Anti-spam: honeypot + trampa de tiempo ---
  // Si el honeypot llegó lleno, o el envío fue casi instantáneo (< 1.5s desde
  // que se pintó el formulario), es casi con certeza un bot. Se responde éxito
  // igualmente para no delatar la detección, sin insertar nada.
  const honeypot = String(body?.sitio_web ?? '')
  const montadoEn = Number(body?.montado_en)
  const envioMuyRapido = Number.isFinite(montadoEn) && Date.now() - montadoEn < 1500
  if (honeypot || envioMuyRapido) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  // --- Validaciones mínimas ---
  const consentimiento = body?.consentimiento === true
  if (!consentimiento) {
    return NextResponse.json(
      { error: 'Debes autorizar el tratamiento de datos (Ley 1581/2012).' },
      { status: 400 }
    )
  }

  const nombre = String(body?.nombre ?? '').trim()
  const telefono = String(body?.telefono ?? '').trim()
  if (!nombre || !telefono) {
    return NextResponse.json(
      { error: 'Nombre y teléfono son obligatorios.' },
      { status: 400 }
    )
  }

  const modalidad = String(body?.modalidad ?? '').trim().toLowerCase()
  if (modalidad && !MODALIDADES.has(modalidad)) {
    return NextResponse.json({ error: 'Modalidad inválida.' }, { status: 400 })
  }

  // ingresos: número >= 0 o null
  let ingresos = null
  if (body?.ingresos !== undefined && body?.ingresos !== null && body?.ingresos !== '') {
    const n = Number(body.ingresos)
    ingresos = Number.isFinite(n) && n >= 0 ? n : null
  }

  // origen: qué página del sitio envió el lead. Si no llega o no está en el
  // allow-list, se omite y la columna usa su DEFAULT ('landing').
  const origenCandidato = String(body?.origen ?? '').trim()
  const origen = esOrigenValido(origenCandidato) ? origenCandidato : ''

  try {
    await upsertLeadConDedup({
      nombre,
      telefono,
      correo: String(body?.correo ?? '').trim() || null,
      actividad: String(body?.actividad ?? '').trim() || null,
      ingresos,
      modalidad: modalidad || null,
      mensaje: String(body?.mensaje ?? '').trim() || null,
      origen: origen || null,
    })
  } catch (error) {
    console.error('Error guardando lead:', error.message) // no exponemos detalle al cliente
    return NextResponse.json({ error: 'No pudimos registrar tus datos.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}

// Solo POST: cualquier otro método responde 405.
export async function GET() {
  return NextResponse.json({ error: 'Método no permitido.' }, { status: 405 })
}
