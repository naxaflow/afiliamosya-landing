import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Cliente con la sesión del usuario (vía cookies), para usar en Server
// Components, Server Actions y Route Handlers del panel. Usa la anon key —
// nunca la service_role key — porque respeta la sesión de quien hace la
// petición.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // set() puede fallar si se llama desde un Server Component (solo
            // lectura). Es seguro ignorarlo cuando hay proxy.js refrescando
            // la sesión en cada navegación.
          }
        },
      },
    }
  );
}
