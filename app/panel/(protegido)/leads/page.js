import Link from "next/link";
import { requireRole } from "@/lib/dal";
import { getAdmin } from "@/lib/supabase/admin";
import { ORIGENES } from "@/lib/origenes";
import styles from "@/components/panel/Panel.module.css";

export const metadata = {
  title: "Leads — Panel",
  robots: { index: false, follow: false },
};

const ESTADOS = ["nuevo", "contactado", "cotizado", "afiliado", "descartado"];
const BADGE_CLASS = {
  nuevo: "badgeNuevo",
  contactado: "badgeContactado",
  cotizado: "badgeCotizado",
  afiliado: "badgeAfiliado",
  descartado: "badgeDescartado",
};

function fmtFecha(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function LeadsPage({ searchParams }) {
  await requireRole(["admin", "operaciones", "lectura"]);
  const sp = await searchParams;

  let query = getAdmin()
    .from("leads")
    .select("id, nombre, telefono, correo, origen, estado, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (sp?.estado) query = query.eq("estado", sp.estado);
  if (sp?.origen) query = query.eq("origen", sp.origen);
  if (sp?.desde) query = query.gte("created_at", sp.desde);
  if (sp?.hasta) query = query.lte("created_at", sp.hasta);

  const { data: leads, error } = await query;

  const params = new URLSearchParams();
  if (sp?.estado) params.set("estado", sp.estado);
  if (sp?.origen) params.set("origen", sp.origen);
  if (sp?.desde) params.set("desde", sp.desde);
  if (sp?.hasta) params.set("hasta", sp.hasta);

  return (
    <>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.h1}>Leads</h1>
          <p className={styles.sub}>Todos los leads capturados en el sitio.</p>
        </div>
        <a className={styles.btnGhost} href={`/panel/leads/export?${params.toString()}`}>
          Exportar CSV
        </a>
      </div>

      <form className={styles.filters} method="get">
        <select name="estado" defaultValue={sp?.estado || ""}>
          <option value="">Todos los estados</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select name="origen" defaultValue={sp?.origen || ""}>
          <option value="">Todos los orígenes</option>
          {ORIGENES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <input type="date" name="desde" defaultValue={sp?.desde || ""} />
        <input type="date" name="hasta" defaultValue={sp?.hasta || ""} />
        <button type="submit" className={styles.btnPrimary}>
          Filtrar
        </button>
      </form>

      <div className={styles.tableWrap}>
        {error && <div className={styles.empty}>No pudimos cargar los leads: {error.message}</div>}
        {!error && (!leads || leads.length === 0) && (
          <div className={styles.empty}>No hay leads con estos filtros.</div>
        )}
        {!error && leads && leads.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Origen</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>
                    <Link href={`/panel/leads/${l.id}`}>{l.nombre}</Link>
                  </td>
                  <td>{l.telefono}</td>
                  <td>{l.origen || "—"}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[BADGE_CLASS[l.estado]] || ""}`}>
                      {l.estado}
                    </span>
                  </td>
                  <td>{fmtFecha(l.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
