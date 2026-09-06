import Image from "next/image";
import Link from "next/link";
import Bienvenida from "@/components/Bienvenida";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import ComunidadForm from "@/components/ComunidadForm";
import CTAFinal from "@/components/CTAFinal";
import Reveal from "@/components/Reveal";
import styles from "@/components/Home.module.css";

export const metadata = {
  title: { absolute: "Afiliamos Ya! - Seguridad Social" },
  description:
    "Salud, pensión y ARL al día para independientes, dependientes y empresas. Con agremiación autorizada por el Ministerio de Salud. Cotiza por WhatsApp en minutos.",
  openGraph: {
    title: "¡Afiliamos Ya! — Con ARL de verdad",
    description:
      "Salud, pensión y ARL al día. Solo una agremiación autorizada puede darte ARL. Cotiza por WhatsApp.",
    url: "/",
  },
};

// Los 4 componentes oficiales y fijos del Sistema de Seguridad Social — por
// eso sí tiene sentido numerarlos (no es una lista arbitraria de "features").
const PILARES = [
  {
    n: "01",
    t: "Salud",
    d: "Afiliación y gestión ante tu EPS, traslados y novedades.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    n: "02",
    t: "Riesgos Laborales",
    d: "ARL colectiva — algo que solo una agremiación autorizada puede dar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    n: "03",
    t: "Pensión",
    d: "Aportes y seguimiento de tu historia laboral.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    n: "04",
    t: "Caja de Compensación",
    d: "Beneficios adicionales, cuando aplica (Ley 789 de 2002).",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="8" width="16" height="12" rx="1" />
        <path d="M4 8l8-4 8 4" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
  },
];

const SERVICIOS = [
  { img: "/images/salud-hero.jpg", t: "Salud", d: "Afiliaciones, traslados y novedades ante tu EPS.", href: "/salud" },
  { img: "/images/arl-hero.jpg", t: "ARL Colectiva", d: "El diferenciador legal de la compañía: ARL colectiva real.", href: "/arl-colectiva" },
  { img: "/images/independientes.jpg", t: "Independientes", d: "Contratistas y cuenta propia. Incluye Afiliamos Ya Premium.", href: "/independientes" },
  { img: "/images/exterior-hero.jpg", t: "Colombianos en el Exterior", d: "Sigue aportando a tu pensión desde donde estés.", href: "/exterior" },
];

const REFERIDOS = [
  "Recomiendas a un familiar, amigo o compañero de trabajo",
  "Nosotros lo afiliamos con el mismo acompañamiento que a ti",
  "Tú recibes un beneficio exclusivo por cada referido afiliado",
];

const FAQ = [
  ["¿Me dan ARL de verdad?", "Sí. Operamos a través de una agremiación autorizada por el Ministerio de Salud, lo que nos permite afiliarte a riesgos laborales de forma colectiva. Es algo que ninguna app de autoliquidación puede ofrecer."],
  ["¿Cuánto pago al mes?", "Pagas tus aportes de ley (los que ves en la calculadora) más una cuota de administración por gestionarte todo. Te damos el valor exacto en tu cotización."],
  ["¿Qué es el IBC?", "Es la base sobre la que se calculan tus aportes. Para independientes es el 40% de tus ingresos, con un mínimo de 1 salario mínimo. Nosotros lo calculamos bien para que la UGPP no te haga requerimientos."],
  ["¿Qué pasa si dejo de pagar un mes?", "Puedes caer en mora, perder cobertura y acumular sanciones. Por eso te enviamos recordatorios y llevamos tu control mes a mes."],
];

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      <Bienvenida />
      <Hero />
      <TrustBar />

      <section className={`${styles.section} ${styles.quienesSection}`}>
        <Image
          src="/logo-icon.png"
          alt=""
          width={400}
          height={400}
          className={styles.quienesBgLogo}
        />
        <div className={styles.quienesGrid}>
          <Reveal>
            <span className={styles.eyebrow} style={{ color: "var(--color-primary)" }}>Quiénes somos</span>
            <h2 className={styles.h2}>
              Empresa de <span style={{ color: "var(--color-primary)" }}>confianza</span>, con más
              de <span style={{ color: "var(--color-primary)" }}>25</span> años en{" "}
              <span style={{ color: "var(--color-primary)" }}>Seguridad Social</span>
            </h2>
            <p>
              ¡Afiliamos Ya! es una empresa especializada en gestión de seguridad social,
              dedicada a que trabajadores independientes y empresas estén al día con sus
              obligaciones de salud, pensión, riesgos laborales y caja de compensación, sin
              necesidad de interpretar la normatividad vigente por su cuenta.
            </p>
            <p>
              Con más de 25 años de experiencia en el sector, operamos a través de una
              agremiación autorizada por el Ministerio de Salud — lo que nos permite ofrecer
              ARL colectiva real, una cobertura que va más allá de la simple liquidación de
              PILA que ofrecen las plataformas de autoliquidación. Cada afiliación está
              respaldada por un equipo de asesores disponible por WhatsApp, no por un
              formulario sin seguimiento.
            </p>
          </Reveal>
          <Reveal delay={150} className={styles.statsCol}>
            <div className={styles.stat}>
              <div className={styles.statNum}>25+</div>
              <div className={styles.statLabel}>Años de experiencia en el sector</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>100%</div>
              <div className={styles.statLabel}>Gestión con agremiación autorizada</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>&lt;30 min</div>
              <div className={styles.statLabel}>Tiempo de respuesta promedio por WhatsApp</div>
            </div>
            <WhatsAppButton
              mensaje="Hola ¡Afiliamos Ya!, quiero más información sobre sus servicios de Seguridad Social."
              className={styles.statsCtaBtn}
            >
              Más información
            </WhatsAppButton>
          </Reveal>
        </div>
      </section>

      <div className={styles.sectionGray}>
        <section className={styles.section} style={{ minHeight: "600px" }}>
          <Reveal>
            <span className={styles.eyebrow} style={{ color: "var(--color-primary)" }}>Lo que hacemos</span>
            <h2 className={styles.h2}>Servicios que ofrecemos</h2>
            <p className={styles.sub}>
              Cada servicio tiene su propia gestión — entra al que te
              corresponde para ver el detalle completo.
            </p>
          </Reveal>
          <Reveal delay={150} className={styles.audList}>
            {SERVICIOS.map((a) => (
              <Link className={styles.audRow} href={a.href} key={a.t}>
                <Image className={styles.audPhoto} src={a.img} alt="" width={56} height={56} />
                <div>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </div>
                <span className={styles.audLink}>Ver página →</span>
              </Link>
            ))}
          </Reveal>
        </section>
      </div>

      <section className={styles.section} style={{ minHeight: "675px" }}>
        <Reveal>
          <span className={styles.eyebrow} style={{ color: "var(--color-primary)" }}>Seguridad social</span>
          <h2 className={`${styles.h2} ${styles.h2Dark}`}>Un solo lugar para tus aportes</h2>
          <p className={styles.sub}>
            En Afiliamos Ya facilitamos la gestión de la Seguridad Social para
            independientes, trabajadores y empresas: afiliación, novedades,
            liquidación y pago de aportes a los diferentes componentes del sistema.
          </p>
        </Reveal>
        <Reveal delay={150} className={styles.pilaresLedger}>
          {PILARES.map((p) => (
            <div className={styles.pilarRow} key={p.t}>
              <div className={styles.pilarNum}>{p.n}</div>
              <div className={styles.pilarTitulo}>
                <span className={styles.pilarIcon}>{p.icon}</span>
                <h3>{p.t}</h3>
              </div>
              <p>{p.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <div className={styles.sectionAlt} style={{ background: "#000" }}>
        <section className={styles.section} style={{ textAlign: "center", minHeight: "675px" }}>
          <Reveal>
            <span className={styles.eyebrow} style={{ color: "var(--color-primary)" }}>Agenda tu cita</span>
            <h2 className={`${styles.h2} ${styles.h2Center}`} style={{ color: "#fff" }}>Habla con un asesor, no con un formulario</h2>
            <p className={styles.sub} style={{ marginLeft: "auto", marginRight: "auto", color: "rgba(255,255,255,0.7)" }}>
              Agenda una llamada o videollamada por WhatsApp y resuelve todas tus
              dudas sobre tu Seguridad Social antes de afiliarte.
            </p>
          </Reveal>
          <Reveal delay={150} className={styles.ctaCard}>
            <Image
              src="/images/asesor-2.jpg"
              alt=""
              width={88}
              height={88}
              className={styles.advisorPhoto}
            />
            <p>
              Cuéntanos qué necesitas y un asesor de ¡Afiliamos Ya! coordina
              contigo el mejor horario para tu consulta.
            </p>
            <WhatsAppButton
              mensaje="Hola ¡Afiliamos Ya!, quiero agendar una consulta para resolver mis dudas sobre mi Seguridad Social."
              className={styles.ctaCardBtn}
            >
              Agendar por WhatsApp
            </WhatsAppButton>
          </Reveal>
        </section>
      </div>

      <div className={styles.sectionAlt}>
        <section className={styles.section} style={{ minHeight: "675px" }}>
          <div className={styles.quienesGrid}>
            <Reveal>
              <span className={styles.eyebrow} style={{ color: "var(--color-primary)" }}>Referidos</span>
              <h2 className={styles.h2}>Comparte la voz</h2>
              <p className={styles.highlight}>Refiere una persona, gana $50,000 COP</p>
              <p className={styles.sub}>
                ¿Conoces a alguien que debería estar protegido con su Seguridad
                Social? Refiérelo con ¡Afiliamos Ya! — una vez se afilie y quede
                al día, te enviamos $50,000 COP.
              </p>
              <ul className={styles.checklist} style={{ marginLeft: 0 }}>
                {REFERIDOS.map((t) => (
                  <li key={t}>
                    <span className={styles.checkIcon}>
                      <Check />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={150}>
              <ComunidadForm
                titulo="Tus datos"
                descripcion="Déjanos tus datos y te contactamos para coordinar tu beneficio."
                boton="Enviar mis datos"
              />
            </Reveal>
          </div>
        </section>
      </div>

      <section className={styles.section} style={{ minHeight: "680px" }}>
        <Reveal>
          <span className={styles.eyebrow} style={{ color: "var(--color-primary)" }}>Cómo pagas</span>
          <h2 className={styles.h2}>Paga tu planilla fácil</h2>
          <p className={styles.sub}>
            Con nuestro operador de pagos, ASOPAGOS S.A., y los medios que ya usas
            todos los días.
          </p>
        </Reveal>
        <Reveal delay={150} className={styles.pagos}>
          {/* eslint-disable-next-line @next/next/no-img-element -- logos de socios, estáticos y livianos, no necesitan el pipeline de optimización */}
          <img src="/logos/asopagos.png" alt="Asopagos S.A." />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/pse.jpg" alt="PSE" style={{ borderRadius: "50%" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/nequi.svg" alt="Nequi" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/efecty.png" alt="Efecty" />
        </Reveal>

        <Reveal delay={150} className={styles.faqIntro}>
          <span className={styles.eyebrow} style={{ color: "var(--color-primary)" }}>Preguntas frecuentes</span>
          <h2 className={styles.h2}>Lo que todo independiente pregunta</h2>
        </Reveal>
        <Reveal delay={250} className={styles.faq}>
          {FAQ.map(([q, a]) => (
            <details className={styles.qa} key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </Reveal>
      </section>

      <CTAFinal />
    </>
  );
}
