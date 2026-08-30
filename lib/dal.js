import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdmin } from "@/lib/supabase/admin";

// verifySession() usa getUser() (no getSession()) porque valida el JWT contra
// el servidor de Auth de Supabase — revocable si el usuario fue desactivado —
// en vez de solo decodificar la cookie localmente. cache() evita repetir la
// verificación varias veces en el mismo render.
export const verifySession = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/panel/login");
  }

  return { user };
});

// getProfile() consulta la tabla profiles con el cliente service_role (no hay
// policies de RLS activas — ver supabase/schema.sql) para obtener el rol.
export const getProfile = cache(async (userId) => {
  const { data, error } = await getAdmin()
    .from("profiles")
    .select("id, full_name, role, activo")
    .eq("id", userId)
    .single();

  if (error || !data || !data.activo) {
    redirect("/panel/login");
  }

  return data;
});

// requireRole() se invoca al inicio de cada Server Component protegido, cada
// Server Action de mutación, y cada Route Handler del panel — el matcher de
// proxy.js no cubre llamadas directas a Server Actions, así que no basta con
// el chequeo optimista.
export async function requireRole(rolesPermitidos) {
  const { user } = await verifySession();
  const profile = await getProfile(user.id);

  if (!rolesPermitidos.includes(profile.role)) {
    redirect("/panel/leads");
  }

  return { user, profile };
}
