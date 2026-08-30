import styles from "./TrustBadge.module.css";

export default function TrustBadge() {
  return (
    <div className={styles.franja}>
      Empresa Autorizada <span className={styles.sep}>•</span> MINSALUD{" "}
      <span className={styles.sep}>•</span> +25 Años de Experiencia
    </div>
  );
}
