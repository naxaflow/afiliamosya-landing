"use client";

import { useActionState } from "react";
import { invitarUsuario } from "@/app/panel/(protegido)/equipo/actions";
import styles from "./Panel.module.css";

export default function InviteForm() {
  const [state, formAction, pending] = useActionState(invitarUsuario, null);

  return (
    <form action={formAction} className={styles.card}>
      <h2>Invitar al equipo</h2>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      {state?.ok && <p style={{ color: "#15803d", fontSize: ".86rem", marginBottom: 10 }}>Invitación enviada.</p>}

      <input name="full_name" placeholder="Nombre completo" className={styles.field} />
      <input name="email" type="email" required placeholder="Correo" className={styles.field} />
      <select name="role" defaultValue="lectura" className={styles.field}>
        <option value="admin">Admin</option>
        <option value="operaciones">Operaciones</option>
        <option value="lectura">Solo lectura</option>
      </select>

      <button type="submit" className={styles.btnPrimary} disabled={pending}>
        {pending ? "Enviando…" : "Enviar invitación"}
      </button>
    </form>
  );
}
