import "server-only";
import { createClient } from "@supabase/supabase-js";

// service_role: ignora RLS por diseño. Solo se importa desde código de
// servidor (Route Handlers, Server Actions, Server Components) — nunca desde
// un Client Component. Las vars no llevan prefijo NEXT_PUBLIC_, así que jamás
// se incrustan en el bundle del cliente.
//
// Creación perezosa (no al importar el módulo): así una ruta que no llega a
// usar el cliente no revienta solo porque las variables de entorno todavía
// no están configuradas en este entorno.
let cliente;

export function getAdmin() {
  if (!cliente) {
    cliente = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );
  }
  return cliente;
}
