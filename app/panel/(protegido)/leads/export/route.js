import { requireRole } from "@/lib/dal";
import { getAdmin } from "@/lib/supabase/admin";
import { toCsv } from "@/lib/csv";

export const runtime = "nodejs";

export async function GET(req) {
  await requireRole(["admin", "operaciones", "lectura"]);

  const { searchParams } = new URL(req.url);
  let query = getAdmin().from("leads").select("*").order("created_at", { ascending: false });

  if (searchParams.get("estado")) query = query.eq("estado", searchParams.get("estado"));
  if (searchParams.get("origen")) query = query.eq("origen", searchParams.get("origen"));
  if (searchParams.get("desde")) query = query.gte("created_at", searchParams.get("desde"));
  if (searchParams.get("hasta")) query = query.lte("created_at", searchParams.get("hasta"));

  const { data, error } = await query;
  if (error) {
    return new Response("Error generando el reporte.", { status: 500 });
  }

  const csv = toCsv(data);
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "X-Robots-Tag": "noindex",
    },
  });
}
