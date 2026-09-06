import LeadForm from "@/components/LeadForm";
import { EMAIL, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/site";
import homeStyles from "@/components/Home.module.css";
import styles from "@/components/Contacto.module.css";

export const metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp, correo o teléfono. Un asesor de ¡Afiliamos Ya! te contacta en menos de 30 minutos.",
  openGraph: { url: "/contacto", images: ["/og-image.png"] },
};

export default function ContactoPage() {
  return (
    <section className={homeStyles.section}>
      <span className={homeStyles.eyebrow}>Contacto</span>
      <h1 className={homeStyles.h2}>Hablemos de tu Seguridad Social</h1>
      <p className={homeStyles.sub}>
        Déjanos tus datos o escríbenos directamente — un asesor de ¡Afiliamos Ya!
        te contacta en menos de 30 minutos.
      </p>

      <div className={styles.grid}>
        <div>
          <div className={styles.infoCards}>
            <div className={styles.card}>
              <span className={styles.icon}>💬</span>
              <div>
                <h3>WhatsApp</h3>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>☎️</span>
              <div>
                <h3>Teléfono</h3>
                <a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.icon}>✉️</span>
              <div>
                <h3>Correo</h3>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
          </div>

          <div className={styles.badge}>
            <b>Con agremiación autorizada · Min. Salud</b>
            <p>
              Operamos a través de una agremiación autorizada por el Ministerio de
              Salud — la única figura que puede darte ARL colectiva.
            </p>
          </div>
        </div>

        <LeadForm origen="contacto" titulo="Déjanos tus datos" />
      </div>
    </section>
  );
}
