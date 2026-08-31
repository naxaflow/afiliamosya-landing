import ServicioPage from "@/components/ServicioPage";
import styles from "@/components/ServicioPage.module.css";

export const metadata = {
  title: "Independientes",
  description:
    "Gestión de EPS, ARL, Pensión y PILA para contratistas y trabajadores independientes. Incluye Afiliamos Ya Premium.",
  openGraph: { url: "/independientes" },
};

const SERVICIOS = [
  "Gestión de pago de EPS",
  "Afiliación a ARL, cuando corresponda",
  "Afiliación y aportes a Pensión",
  "Liquidación de tu PILA",
  "Novedades de ingreso, retiro, variación de salario, ajustes de planillas",
  "Orientación para el pago de tus aportes",
];

export default function Page() {
  return (
    <ServicioPage
      eyebrow="Independientes"
      title="Seguridad Social para Independientes"
      image="/images/independientes.jpg"
      titleColor="#fff"
      lede="Si trabajas por cuenta propia, eres contratista o desarrollas una actividad económica independiente, en Afiliamos Ya te ayudamos a gestionar tu Seguridad Social."
      sectionMinHeight="680px"
      servicios={SERVICIOS}
      closing="Nos encargamos de la gestión para que tú puedas concentrarte en tu actividad."
      ctaTexto="¿Necesitas gestionar tu Seguridad Social? Déjanos tus datos y uno de nuestros asesores se pondrá en contacto contigo."
      ctaMensaje="Hola ¡Afiliamos Ya!, soy independiente y quiero información sobre mi proceso de afiliación. Autorizo que me contacten por este medio."
      ctaBoton="Solicitar información"
      extra={
        <div className={styles.calloutLight}>
          <span className={styles.badge}>¡Afiliamos Ya! Premium</span>
          <h3>Un asesor gestiona tu Seguridad Social — tú solo te dedicas a trabajar</h3>
          <p className={styles.premiumPrecio}>
            $29.900 COP<span>/mes · sin permanencia</span>
          </p>
          <p>
            Tu aporte de ley se paga aparte, al valor exacto que te corresponde.
            Con Premium, un asesor asignado se encarga de que nunca te falte un
            pago ni te llegue un requerimiento por un cálculo mal hecho.
          </p>
          <p className={styles.premiumSubtitulo}>¿Qué incluye tu suscripción?</p>
          <ul>
            <li>Asesor asignado para tu afiliación a EPS, ARL y Pensión</li>
            <li>Cálculo correcto de tu IBC cada mes</li>
            <li>Liquidación y generación de tu planilla</li>
            <li>Recordatorios de pago, para que nunca se te pase una fecha</li>
            <li>Gestión de novedades y ajustes cuando los necesites</li>
            <li>Soporte directo por WhatsApp</li>
            <li>Incluye ARL colectiva real — algo que otros planes de acompañamiento no ofrecen</li>
          </ul>
        </div>
      }
    />
  );
}
