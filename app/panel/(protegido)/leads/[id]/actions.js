"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/dal";
import { getAdmin } from "@/lib/supabase/admin";

const ESTADOS = ["nuevo", "contactado", "cotizado", "afiliado", "descartado"];

export async function cambiarEstado(leadId, formData) {
  const { user } = await requireRole(["admin", "operaciones"]);
  const admin = getAdmin();

  const estadoNuevo = String(formData.get("estado") ?? "");
  if (!ESTADOS.includes(estadoNuevo)) return;

  const { data: actual } = await admin.from("leads").select("estado").eq("id", leadId).single();
  if (!actual || actual.estado === estadoNuevo) return;

  await admin.from("leads").update({ estado: estadoNuevo }).eq("id", leadId);
  await admin.from("lead_events").insert({
    lead_id: leadId,
    tipo: "cambio_estado",
    estado_anterior: actual.estado,
    estado_nuevo: estadoNuevo,
    actor_id: user.id,
  });

  revalidatePath(`/panel/leads/${leadId}`);
  revalidatePath("/panel/leads");
}

export async function agregarNota(leadId, formData) {
  const { user } = await requireRole(["admin", "operaciones"]);
  const admin = getAdmin();

  const nota = String(formData.get("nota") ?? "").trim();
  if (!nota) return;

  await admin.from("lead_events").insert({
    lead_id: leadId,
    tipo: "nota",
    nota,
    actor_id: user.id,
  });

  revalidatePath(`/panel/leads/${leadId}`);
}
