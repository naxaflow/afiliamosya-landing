"use client";

import { useActionState } from "react";
import { login } from "@/app/panel/login/actions";
import styles from "./Panel.module.css";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction} className={styles.loginCard}>
      <div className={styles.loginBrand}>Panel · ¡Afiliamos Ya!</div>

      {state?.error && <p className={styles.error}>{state.error}</p>}

      <input
        name="email"
        type="email"
        required
        placeholder="Correo"
        className={styles.field}
        autoComplete="username"
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Contraseña"
        className={styles.field}
        autoComplete="current-password"
      />

      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
