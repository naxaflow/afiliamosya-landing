import Link from "next/link";
import { verifySession, getProfile } from "@/lib/dal";
import { logout } from "./actions";
import styles from "@/components/panel/Panel.module.css";

export const metadata = {
  robots: { index: false, follow: false },
};

const ROLE_LABEL = { admin: "Admin", operaciones: "Operaciones", lectura: "Solo lectura" };

export default async function PanelLayout({ children }) {
  const { user } = await verifySession();
  const profile = await getProfile(user.id);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>Panel · ¡Afiliamos Ya!</div>

        <nav className={styles.sidebarLinks}>
          <Link href="/panel/leads" className={styles.sidebarLink}>
            Leads
          </Link>
          {profile.role === "admin" && (
            <Link href="/panel/equipo" className={styles.sidebarLink}>
              Equipo
            </Link>
          )}
        </nav>

        <div className={styles.sidebarFoot}>
          {profile.full_name || user.email}
          <br />
          <span className={styles.rol}>{ROLE_LABEL[profile.role]}</span>
          <form action={logout}>
            <button type="submit" className={styles.logoutBtn}>
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
