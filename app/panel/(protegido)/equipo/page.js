import { requireRole } from "@/lib/dal";
import { getAdmin } from "@/lib/supabase/admin";
import InviteForm from "@/components/panel/InviteForm";
import { cambiarRol, desactivarUsuario } from "./actions";
import styles from "@/components/panel/Panel.module.css";

export const metadata = {
  title: "Equipo — Panel",
  robots: { index: false, follow: false },
};

const ROLES = ["admin", "operaciones", "lectura"];

export default async function EquipoPage() {
  await requireRole(["admin"]);

  const { data: usuarios } = await getAdmin()
    .from("profiles")
    .select("id, full_name, role, activo, creado_en")
    .order("creado_en", { ascending: false });

  return (
    <>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.h1}>Equipo</h1>
          <p className={styles.sub}>Usuarios con acceso al panel interno.</p>
        </div>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.tableWrap}>
          {(!usuarios || usuarios.length === 0) && <div className={styles.empty}>Aún no hay usuarios.</div>}
          {usuarios && usuarios.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => {
                  const cambiarRolConId = cambiarRol.bind(null, u.id);
                  const desactivarConId = desactivarUsuario.bind(null, u.id);
                  return (
                    <tr key={u.id}>
                      <td>{u.full_name || "—"}</td>
                      <td>
                        <form action={cambiarRolConId} style={{ display: "flex", gap: 6 }}>
                          <select name="role" defaultValue={u.role}>
                            {ROLES.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                          <button type="submit" className={styles.btnPrimary}>
                            OK
                          </button>
                        </form>
                      </td>
                      <td>{u.activo ? "Activo" : "Inactivo"}</td>
                      <td>
                        {u.activo && (
                          <form action={desactivarConId}>
                            <button type="submit" className={styles.btnGhost}>
                              Desactivar
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <InviteForm />
      </div>
    </>
  );
}
