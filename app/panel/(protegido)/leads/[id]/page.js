import { notFound } from "next/navigation";
import { requireRole } from "@/lib/dal";
import { getAdmin } from "@/lib/supabase/admin";
import { cambiarEstado, agregarNota } from "./actions";
import styles from "@/components/panel/Panel.module.css";

export const metadata = {
  title: "Detalle de lead — Panel",
  robots: { index: false, follow: false },
};

const ESTADOS = ["nuevo", "contactado", "cotizado", "afiliado", "descartado"];

function fmtFechaHora(iso) {
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const EVENTO_LABEL = {
  captura: (e) => `Captura desde "${e.origen || "landing"}"`,
  cambio_estado: (e) => `Estado: ${e.estado_anterior} → ${e.estado_nuevo}`,
  nota: (e) => e.nota,
};

export default async function LeadDetailPage({ params }) {
  const { profile } = await requireRole(["admin", "operaciones", "lectura"]);
  const { id } = await params;
  const admin = getAdmin();

  const { data: lead } = await admin.from("leads").select("*").eq("id", id).single();
  if (!lead) notFound();

  const { data: eventos } = await admin
    .from("lead_events")
    .select("*")
    .eq("lead_id", id)
    .order("creado_en", { ascending: false });

  const puedeEditar = profile.role === "admin" || profile.role === "operaciones";
  const cambiarEstadoConId = cambiarEstado.bind(null, id);
  const agregarNotaConId = agregarNota.bind(null, id);

  return (
    <>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.h1}>{lead.nombre}</h1>
          <p className={styles.sub}>Lead capturado desde &quot;{lead.origen || "landing"}&quot;</p>
        </div>
        <a
          className={styles.btnGhost}
          href={`https://wa.me/${lead.telefono.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
        >
          💬 Escribir por WhatsApp
        </a>
      </div>

      <div className={styles.detailGrid}>
        <div>
          <div className={styles.card}>
            <h2>Datos del lead</h2>
            <div className={styles.infoRow}>
              <span>Teléfono</span>
              <b>{lead.telefono}</b>
            </div>
            <div className={styles.infoRow}>
              <span>Correo</span>
              <b>{lead.correo || "—"}</b>
            </div>
            <div className={styles.infoRow}>
              <span>Actividad</span>
              <b>{lead.actividad || "—"}</b>
            </div>
            <div className={styles.infoRow}>
              <span>Ingresos aprox.</span>
              <b>{lead.ingresos ? `$ ${Number(lead.ingresos).toLocaleString("es-CO")}` : "—"}</b>
            </div>
            <div className={styles.infoRow}>
              <span>Modalidad</span>
              <b>{lead.modalidad || "—"}</b>
            </div>
            <div className={styles.infoRow}>
              <span>Mensaje</span>
              <b>{lead.mensaje || "—"}</b>
            </div>
            <div className={styles.infoRow}>
              <span>Registrado</span>
              <b>{fmtFechaHora(lead.created_at)}</b>
            </div>
          </div>

          {puedeEditar && (
            <div className={styles.card}>
              <h2>Agregar nota</h2>
              <form action={agregarNotaConId}>
                <textarea
                  name="nota"
                  rows={3}
                  required
                  placeholder="Ej: hablé con el cliente, pidió llamarlo mañana…"
                  className={styles.textarea}
                  style={{ marginBottom: 10 }}
                />
                <button type="submit" className={styles.btnPrimary}>
                  Guardar nota
                </button>
              </form>
            </div>
          )}
        </div>

        <div>
          <div className={styles.card}>
            <h2>Estado</h2>
            {puedeEditar ? (
              <form action={cambiarEstadoConId} className={styles.stateForm}>
                <select name="estado" defaultValue={lead.estado}>
                  {ESTADOS.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <button type="submit" className={styles.btnPrimary}>
                  Guardar
                </button>
              </form>
            ) : (
              <span className={styles.badge}>{lead.estado}</span>
            )}
          </div>

          <div className={styles.card}>
            <h2>Historial</h2>
            <div className={styles.timeline}>
              {(!eventos || eventos.length === 0) && <p className={styles.sub}>Sin eventos aún.</p>}
              {eventos?.map((e) => (
                <div key={e.id} className={styles.timelineItem}>
                  <b>{EVENTO_LABEL[e.tipo]?.(e) || e.tipo}</b>
                  <span>{fmtFechaHora(e.creado_en)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
