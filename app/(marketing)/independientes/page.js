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
          <h3>Acompañamiento mensual, aunque aún no estés afiliado</h3>
          <p>
            Una cuota mensual de gestión — cálculo de tu IBC, liquidación de tu
            PILA, recordatorios de pago y soporte por WhatsApp — con tu aporte
            real pagado aparte.
          </p>
          <ul>
            <li>Incluye ARL colectiva real, algo que otros planes de acompañamiento no ofrecen</li>
            <li>Ideal si ya cotizas por tu cuenta pero quieres dejar de estar pendiente</li>
          </ul>
        </div>
      }
    />
  );
}
