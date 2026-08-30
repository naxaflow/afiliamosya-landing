import "server-only";
import { getAdmin } from "@/lib/supabase/admin";

// Busca un lead existente por teléfono o correo (normalizados) y lo fusiona
// en vez de duplicarlo. No toca "estado": el pipeline no debe reiniciarse
// solo porque alguien volvió a llenar un formulario. Cada envío queda
// registrado como un evento "captura" en lead_events, exista o no el lead.
export async function upsertLeadConDedup({
  nombre,
  telefono,
  correo,
  actividad,
  ingresos,
  modalidad,
  mensaje,
  origen,
}) {
  const admin = getAdmin();
  const correoNorm = correo ? correo.trim().toLowerCase() : null;

  let existente = null;
  if (telefono || correoNorm) {
    let query = admin.from("leads").select("id").order("created_at", { ascending: false }).limit(1);
    if (telefono && correoNorm) {
      query = query.or(`telefono.eq.${telefono},correo.ilike.${correoNorm}`);
    } else if (telefono) {
      query = query.eq("telefono", telefono);
    } else {
      query = query.ilike("correo", correoNorm);
    }
    const { data } = await query;
    existente = data?.[0] ?? null;
  }

  const campos = {
    nombre,
    telefono,
    correo: correoNorm,
    actividad,
    ingresos,
    modalidad,
    mensaje,
  };
  // Solo se actualizan/insertan los campos que vienen no vacíos — un reenvío
  // parcial (ej. sin "actividad") no debe borrar el dato bueno que ya existía.
  const camposNoVacios = Object.fromEntries(
    Object.entries(campos).filter(([, v]) => v !== null && v !== undefined && v !== "")
  );

  let leadId = existente?.id ?? null;

  if (leadId) {
    const { error } = await admin.from("leads").update(camposNoVacios).eq("id", leadId);
    if (error) throw error;
  } else {
    const { data, error } = await admin
      .from("leads")
      .insert({
        ...camposNoVacios,
        consentimiento: true,
        consentimiento_fecha: new Date().toISOString(),
        ...(origen ? { origen } : {}),
      })
      .select("id")
      .single();
    if (error) throw error;
    leadId = data.id;
  }

  await admin.from("lead_events").insert({
    lead_id: leadId,
    tipo: "captura",
    origen: origen || null,
  });

  return { leadId, fusionado: Boolean(existente) };
}
