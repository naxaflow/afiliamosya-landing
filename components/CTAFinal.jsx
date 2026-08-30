import WhatsAppButton from "./WhatsAppButton";
import Reveal from "./Reveal";
import styles from "./CTAFinal.module.css";

const COTIZA_MSG =
  "Hola ¡Afiliamos Ya!, quiero afiliarme a seguridad social como independiente. Autorizo que me contacten por este medio para mi cotización.";

export default function CTAFinal() {
  return (
    <section className={styles.closer}>
      <Reveal>
        <h2>
          Ponte al día hoy.
          <br />
          Maneja tranquilo mañana.
        </h2>
        <p>
          Escríbenos por WhatsApp y en menos de 30 minutos sabes exactamente cómo
          quedas protegido.
        </p>
        <WhatsAppButton mensaje={COTIZA_MSG} className={styles.btn} />
      </Reveal>
    </section>
  );
}
