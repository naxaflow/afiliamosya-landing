import LoginForm from "@/components/panel/LoginForm";
import styles from "@/components/panel/Panel.module.css";

export const metadata = {
  title: "Panel — Iniciar sesión",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className={styles.loginWrap}>
      <LoginForm />
    </div>
  );
}
