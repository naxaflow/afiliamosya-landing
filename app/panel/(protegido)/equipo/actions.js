"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/dal";
import { getAdmin } from "@/lib/supabase/admin";

const ROLES = ["admin", "operaciones", "lectura"];

export async function invitarUsuario(prevState, formData) {
  await requireRole(["admin"]);

  const email = String(formData.get("email") ?? "").trim();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const role = String(formData.get("role") ?? "lectura");

  if (!email || !ROLES.includes(role)) {
    return { error: "Correo o rol inválido." };
  }

  const { error } = await getAdmin().auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName || null, role },
  });

  if (error) {
    return { error: "No pudimos enviar la invitación: " + error.message };
  }

  revalidatePath("/panel/equipo");
  return { ok: true };
}

export async function cambiarRol(userId, formData) {
  await requireRole(["admin"]);

  const role = String(formData.get("role") ?? "");
  if (!ROLES.includes(role)) return;

  await getAdmin().from("profiles").update({ role }).eq("id", userId);
  revalidatePath("/panel/equipo");
}

export async function desactivarUsuario(userId) {
  await requireRole(["admin"]);
  await getAdmin().from("profiles").update({ activo: false }).eq("id", userId);
  revalidatePath("/panel/equipo");
}
