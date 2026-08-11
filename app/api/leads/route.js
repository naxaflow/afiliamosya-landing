import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Este handler corre SOLO en el servidor (Node), nunca en el navegador.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// service_role: solo servidor. Las vars NO llevan prefijo NEXT_PUBLIC_,
// así que jamás se incrustan en el bundle del cliente.
const admin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

const MODALIDADES = new Set(['colombia', 'exterior'])

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
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

  // --- Inserción (service_role ignora RLS por diseño) ---
  const { error } = await admin.from('leads').insert({
    nombre,
    telefono,
    actividad: String(body?.actividad ?? '').trim() || null,
    ingresos,
    modalidad: modalidad || null,
    mensaje: String(body?.mensaje ?? '').trim() || null,
    consentimiento: true,
    consentimiento_fecha: new Date().toISOString(), // fecha del envío
    // origen y estado usan sus DEFAULT ('landing' / 'nuevo')
  })

  if (error) {
    console.error('Error guardando lead:', error.message) // no exponemos detalle al cliente
    return NextResponse.json({ error: 'No pudimos registrar tus datos.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}

// Solo POST: cualquier otro método responde 405.
export async function GET() {
  return NextResponse.json({ error: 'Método no permitido.' }, { status: 405 })
}
