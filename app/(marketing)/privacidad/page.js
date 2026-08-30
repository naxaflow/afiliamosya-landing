import { EMAIL, PHONE_DISPLAY } from "@/lib/site";
import homeStyles from "@/components/Home.module.css";
import styles from "@/components/Legal.module.css";

export const metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo ¡Afiliamos Ya! recolecta, usa y protege tus datos personales, conforme a la Ley 1581 de 2012.",
  openGraph: { url: "/privacidad" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <section className={homeStyles.section}>
      <div className={styles.wrap}>
        <span className={homeStyles.eyebrow}>Legal</span>
        <h1 className={homeStyles.h2}>Política de Privacidad</h1>
        <p className={styles.updated}>Última actualización: agosto de 2026</p>

        <div className={styles.body}>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>¡Afiliamos Ya!</strong>, unidad comercial de Multiservice
            Colombia, es responsable del tratamiento de los datos personales que
            recolecta a través de este sitio web (afiliamosya.com) y de sus canales
            de contacto. Puedes comunicarte con nosotros al correo{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> o al WhatsApp{" "}
            {PHONE_DISPLAY}.
          </p>

          <h2>2. Marco legal</h2>
          <p>
            Esta política se rige por el artículo 15 de la Constitución Política de
            Colombia, la Ley 1581 de 2012 y el Decreto 1377 de 2013, que regulan el
            derecho de Habeas Data y la protección de datos personales en Colombia.
          </p>

          <h2>3. Datos que recolectamos</h2>
          <p>
            Cuando diligencias un formulario en este sitio (Home, Salud, ARL
            Colectiva, Independientes, Colombianos en el Exterior, la comunidad de
            ¡Afiliamos Ya! o Contacto) recolectamos: nombre completo, número de
            teléfono/WhatsApp, correo electrónico (cuando aplica), actividad
            económica, ingresos mensuales aproximados y modalidad (Colombia o
            exterior). Estos datos son suministrados voluntariamente por ti y
            solo se almacenan si autorizas expresamente su tratamiento.
          </p>

          <h2>4. Finalidad del tratamiento</h2>
          <p>Usamos tus datos exclusivamente para:</p>
          <ul>
            <li>Contactarte para brindarte información sobre nuestros servicios de gestión de Seguridad Social.</li>
            <li>Elaborar tu cotización de aportes a salud, pensión, ARL y/o Caja de Compensación.</li>
            <li>Gestionar tu proceso de afiliación, si decides continuar con nosotros.</li>
            <li>Dar cumplimiento a obligaciones legales relacionadas con la prestación de nuestros servicios.</li>
          </ul>
          <p>No vendemos ni compartimos tus datos con terceros para fines comerciales ajenos a nuestra gestión.</p>

          <h2>5. Almacenamiento y seguridad</h2>
          <p>
            Tus datos se almacenan en infraestructura de base de datos con controles
            de acceso restringido, a la cual solo tiene acceso el personal
            autorizado de ¡Afiliamos Ya! para los fines descritos en esta política.
          </p>

          <h2>6. Tus derechos como titular</h2>
          <p>Como titular de tus datos personales, tienes derecho a:</p>
          <ul>
            <li>Conocer, actualizar y rectificar tus datos personales.</li>
            <li>Solicitar prueba de la autorización otorgada para el tratamiento de tus datos.</li>
            <li>Ser informado sobre el uso que se ha dado a tus datos personales.</li>
            <li>Revocar la autorización y/o solicitar la supresión de tus datos, cuando no exista un deber legal o contractual que impida su eliminación.</li>
            <li>Acceder de forma gratuita a tus datos personales que hayan sido objeto de tratamiento.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, escríbenos a{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> o por WhatsApp al{" "}
            {PHONE_DISPLAY}, indicando tu solicitud.
          </p>

          <h2>7. Vigencia</h2>
          <p>
            Esta política rige a partir de su fecha de publicación y se conservará
            mientras la relación comercial se mantenga vigente, o mientras exista
            una autorización activa del titular.
          </p>
        </div>
      </div>
    </section>
  );
}
