import Image from "next/image";
import ServicioPage from "@/components/ServicioPage";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import homeStyles from "@/components/Home.module.css";
import styles from "@/components/ServicioPage.module.css";

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M4 12l5 5L20 6" />
  </svg>
);

const PREMIUM_INCLUYE = [
  "Asesor asignado para tu afiliación a EPS, ARL y Pensión",
  "Cálculo correcto de tu IBC cada mes",
  "Liquidación y generación de tu planilla",
  "Recordatorios de pago, para que nunca se te pase una fecha",
  "Gestión de novedades y ajustes cuando los necesites",
  "Soporte directo por WhatsApp",
  "Incluye ARL colectiva real — algo que otros planes de acompañamiento no ofrecen",
];

const PREMIUM_PASOS = [
  {
    titulo: "Te suscribes",
    desc: "Activas Afiliamos Ya Premium y te asignamos tu asesor experto.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M8.5 9.5l2 2 4-4" />
        <line x1="8" y1="15.5" x2="16" y2="15.5" />
      </svg>
    ),
  },
  {
    titulo: "Tu asesor ordena todo",
    desc: "Analiza tu caso, valida tus afiliaciones y gestiona lo que necesites ante EPS, ARL y Pensión.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    ),
  },
  {
    titulo: "Cada mes solo pagas",
    desc: "Calculamos tu IBC, liquidamos tu planilla y gestionamos tus novedades. Te avisamos cuándo pagar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 15h2M14 15h2" />
      </svg>
    ),
  },
];

export const metadata = {
  title: "Independientes",
  description:
    "Gestión de EPS, ARL, Pensión y PILA para contratistas y trabajadores independientes. Incluye Afiliamos Ya Premium.",
  openGraph: { url: "/independientes" },
};

const SERVICIOS_ICONOS = [
  {
    texto: "Gestión de Salud (EPS)",
    desc: "Gestionamos tu afiliación, traslados de EPS y cualquier novedad, para que tu cobertura en salud nunca quede en riesgo.",
    img: "/images/servicio-salud-v3.png",
  },
  {
    texto: "Afiliación de ARL",
    desc: "Te afiliamos a una ARL colectiva real, con la clasificación de riesgo correcta según tu actividad económica.",
    img: "/images/servicio-arl-v3.png",
  },
  {
    texto: "Aportes a Pensión",
    desc: "Calculamos y liquidamos tu aporte a pensión cada mes, para que tu historia laboral siga creciendo sin interrupciones.",
    img: "/images/servicio-pension-v3.png",
  },
  {
    texto: "Planilla PILA",
    desc: "Liquidamos tu planilla con el IBC correcto cada mes, evitando errores que la UGPP pueda cuestionar después.",
    img: "/images/servicio-pila-v3.png",
  },
  {
    texto: "Novedades",
    desc: "Reportamos a tiempo tus cambios de ingreso, retiro o variación salarial, para que tu planilla siempre esté al día.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4V1L8 5l4 4V6a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z" />
      </svg>
    ),
  },
  {
    texto: "Pago de Aportes",
    desc: "Te decimos exactamente cuánto y cuándo pagar, con recordatorios para que nunca se te pase una fecha.",
    img: "/images/servicio-aportes-v3.png",
  },
];

export default function Page() {
  return (
    <>
      <ServicioPage
        eyebrow="Independientes"
        title="Seguridad Social para Independientes"
        image="/images/independientes.jpg"
        titleColor="#fff"
        eyebrowColor="#FF7700"
        heroBadge
        lede="Si trabajas por cuenta propia, eres contratista o desarrollas una actividad económica independiente, en Afiliamos Ya te ayudamos a gestionar tu Seguridad Social. Nos encargamos de la gestión para que tú puedas concentrarte en tu actividad."
        ledeCentered
        ledeColor="#000"
        ledeMarginTop="56px"
        sectionMinHeight="680px"
        servicios={[]}
        listaMarginTop="calc(20px + 0.2in)"
        ctaTexto="¿Necesitas gestionar tu Seguridad Social? Déjanos tus datos y uno de nuestros asesores se pondrá en contacto contigo."
        ctaMensaje="Hola ¡Afiliamos Ya!, soy independiente y quiero información sobre mi proceso de afiliación. Autorizo que me contacten por este medio."
        ctaBoton="Solicitar información"
        ctaBoxMarginTop="calc(80px - 0.2in)"
        ledeAfterExtra
        extra={
          <>
            <div className={styles.calloutTitleBox}>
              <h3 className={styles.premiumTitulo}>
                ¡Afiliamos Ya!
                <span className={styles.premiumWord}>Premium</span>
              </h3>
              <p className={styles.premiumHeadSub}>Deja en manos de un Experto tu Seguridad Social</p>
            </div>
            <ul className={styles.serviciosEmoji}>
              {SERVICIOS_ICONOS.map((s, i) => (
                <Reveal key={s.texto} as="li" delay={80 + i * 60}>
                  <span className={styles.serviciosEmojiIcon}>
                    {s.img ? (
                      <Image src={s.img} alt="" fill sizes="90px" className={styles.serviciosEmojiImg} />
                    ) : (
                      s.icon
                    )}
                  </span>
                  <span className={styles.serviciosEmojiTitulo}>{s.texto}</span>
                  <span className={styles.serviciosEmojiDesc}>{s.desc}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal as="p" delay={150} className={styles.serviciosLema}>
              Un pequeño &quot;<span className={styles.serviciosLemaNeutro}>ahorro</span>&quot; hoy
              puede convertirse en un gran &quot;
              <span className={styles.serviciosLemaNeutro}>gasto</span>&quot; en el futuro
            </Reveal>
            <Reveal as="div" delay={200} className={styles.pricingCard}>
              <div className={styles.pricingLeft}>
                <div className={styles.pricingBadge}>
                  <span className={styles.pricingBadgeTitle}>¡Afiliamos Ya!</span>
                  <span className={styles.pricingBadgeWord}>Premium</span>
                </div>
                <p className={styles.pricingPrice}>
                  $29.900 COP
                  <span className={styles.pricingPriceSuffix}>Al mes • Sin cláusula de permanencia</span>
                </p>
                <p className={styles.pricingDesc}>
                  Tu aporte de ley se paga aparte, al valor exacto que te
                  corresponde. Un asesor asignado se encarga de que nunca te
                  falte un pago ni te llegue un requerimiento por un cálculo
                  mal hecho.
                </p>
              </div>
              <div className={styles.pricingRight}>
                <p className={styles.pricingRightTitle}>¿Qué incluye tu suscripción?</p>
                <ul className={styles.pricingList}>
                  {PREMIUM_INCLUYE.map((t) => (
                    <li key={t}>
                      <span className={styles.pricingCheck}>
                        <Check />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  variant="primary"
                  className={styles.pricingCtaSecondary}
                  mensaje="Hola ¡Afiliamos Ya!, quiero suscribirme a Afiliamos Ya Premium. Autorizo que me contacten por este medio."
                >
                  Quiero Suscribirme
                </WhatsAppButton>
              </div>
            </Reveal>
          </>
        }
      />

      <div className={homeStyles.sectionGray}>
        <section className={styles.stepsSection}>
          <Reveal as="h2" className={styles.stepsTitle}>
            Deja tu Seguridad Social en Manos de un Profesional en 3 Pasos
          </Reveal>
          <div className={styles.stepsGrid}>
            {PREMIUM_PASOS.map((p, i) => (
              <Reveal key={p.titulo} as="div" delay={100 + i * 100} className={styles.stepCard}>
                <span className={styles.stepNumberBg}>{i + 1}</span>
                <span className={styles.stepIcon}>{p.icon}</span>
                <h3 className={styles.stepTitle}>{p.titulo}</h3>
                <p className={styles.stepDesc}>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
