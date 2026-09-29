import { EMAIL, PHONE_DISPLAY } from "@/lib/site";
import homeStyles from "@/components/Home.module.css";
import styles from "@/components/Legal.module.css";

export const metadata = {
  title: "Términos y Condiciones",
  description: "Condiciones de uso del sitio web de ¡Afiliamos Ya! y de sus servicios de gestión de Seguridad Social.",
  openGraph: { url: "/terminos", images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <section className={homeStyles.section}>
      <div className={styles.wrap}>
        <span className={homeStyles.eyebrow}>Legal</span>
        <h1 className={homeStyles.h2}>Términos y Condiciones</h1>
        <p className={styles.updated}>Última actualización: agosto de 2026</p>

        <div className={styles.body}>
          <h2>1. Objeto</h2>
          <p>
            Estos términos regulan el uso del sitio web afiliamosya.com, operado por
            <strong> ¡Afiliamos Ya!</strong>, unidad comercial de Multiservice
            Colombia. Al usar este sitio o diligenciar alguno de sus formularios,
            aceptas estas condiciones.
          </p>

          <h2>2. Naturaleza del servicio</h2>
          <p>
            ¡Afiliamos Ya! opera a través de una agremiación autorizada por el
            Ministerio de Salud para gestionar la afiliación de trabajadores
            independientes, dependientes y empresas a los distintos componentes del
            Sistema de Seguridad Social (Salud, Pensión, ARL y Caja de
            Compensación). No somos una EPS, AFP, ARL ni Caja de Compensación —
            actuamos como gestores e intermediarios de tu afiliación y del pago de
            tus aportes ante dichas entidades.
          </p>

          <h2>3. La calculadora de aportes</h2>
          <p>
            La calculadora publicada en este sitio ofrece un estimado informativo de
            tu aporte mensual de ley, basado en los valores oficiales vigentes
            (SMMLV y tarifas de cada componente) y en los datos que ingresas. El
            resultado es una referencia y no constituye una cotización vinculante —
            el valor exacto de tu aporte y de nuestra cuota de gestión se confirma
            en tu cotización personalizada.
          </p>

          <h2>4. Promoción &quot;Afíliate hoy con descuento de hasta 100%&quot;</h2>
          <p>
            La promoción &quot;Afíliate hoy con descuento de hasta 100%&quot; ofrece beneficios
            diferentes según el tipo de vinculación del usuario. Los beneficios promocionales
            se aplican exclusivamente en los términos y condiciones establecidos para cada
            modalidad.
          </p>

          <h3>4.1. Trabajadores dependientes</h3>
          <p>
            Para las personas que se vinculen como dependientes, el beneficio consiste en un
            descuento del 100% sobre el valor correspondiente al trámite inicial de afiliación
            realizado a través de nuestra entidad.
          </p>
          <p>
            Este beneficio comprende exclusivamente las gestiones administrativas
            relacionadas con el proceso de afiliación que se realizan durante el primer mes de
            vinculación.
          </p>
          <p>
            El descuento no comprende los aportes al Sistema de Seguridad Social que
            correspondan al cotizante, ni los valores que deban ser pagados a las entidades a
            las cuales se encuentre afiliado el cotizante, tales como EPS, ARL y fondo de
            pensiones, entre otras.
          </p>
          <p>
            Por lo tanto, a partir de los períodos siguientes al mes inicial de afiliación,
            los pagos correspondientes a las entidades del Sistema de Seguridad Social
            deberán realizarse conforme a los valores y tarifas que correspondan en cada
            período. El beneficio del 100% no se extiende a dichos pagos ni a los meses
            posteriores.
          </p>

          <h3>4.2. Trabajadores independientes</h3>
          <p>
            Para las personas que se vinculen como trabajadores independientes, el beneficio
            promocional consiste en un (1) mes de prueba gratuita del servicio
            administrativo/membresía ¡Afiliamos Ya! Premium.
          </p>
          <p>
            El beneficio aplica únicamente sobre el valor del servicio administrativo o
            membresía durante el primer mes de prueba.
          </p>
          <p>
            El mes gratuito no significa que la persona quede exonerada del pago de sus
            aportes a la Seguridad Social. Los valores correspondientes a la planilla y a los
            aportes que deban pagarse a las entidades del Sistema de Seguridad Social,
            incluyendo salud, pensión y riesgos laborales cuando corresponda, no están
            incluidos dentro del beneficio promocional y deberán ser asumidos por el afiliado
            conforme a la liquidación correspondiente.
          </p>
          <p>
            Para acceder al mes de prueba gratuito, el usuario deberá asociar una tarjeta de
            pago válida al momento de adquirir la membresía.
          </p>
          <p>
            Una vez finalizado el período gratuito de un (1) mes, se cobrará automáticamente
            el valor vigente de la membresía ¡Afiliamos Ya! Premium, de acuerdo con las
            condiciones aceptadas al momento de la contratación, salvo que el usuario cancele
            la membresía antes de finalizar dicho período de prueba.
          </p>

          <h3>4.3. Alcance del beneficio</h3>
          <p>
            Los descuentos y beneficios descritos en esta promoción se aplican únicamente a
            los conceptos expresamente indicados en estos términos y condiciones.
          </p>
          <p>
            En ningún caso el descuento promocional deberá interpretarse como una exoneración
            del pago de los aportes obligatorios al Sistema de Seguridad Social o de los
            valores que deban ser pagados a las entidades administradoras correspondientes.
          </p>
          <p>
            Los valores de los aportes a Seguridad Social pueden variar de acuerdo con la
            situación particular del afiliado, el ingreso base de cotización, la actividad
            desarrollada, el nivel de riesgo y las disposiciones aplicables en cada período.
          </p>
          <p>
            La aceptación de la promoción implica el conocimiento y aceptación de las
            condiciones aquí descritas.
          </p>

          <h2>5. Uso del sitio</h2>
          <p>
            Te comprometes a usar este sitio de forma lícita y a suministrar
            información veraz en los formularios de contacto y afiliación. Nos
            reservamos el derecho de verificar la información suministrada antes de
            continuar con cualquier proceso de gestión.
          </p>

          <h2>6. Canales de contacto</h2>
          <p>
            El canal principal de atención es WhatsApp, al número {PHONE_DISPLAY}.
            También puedes escribirnos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            Buscamos responder en menos de 30 minutos en horario hábil.
          </p>

          <h2>7. Propiedad intelectual</h2>
          <p>
            El contenido de este sitio — textos, logo, diseño y demás elementos
            gráficos — es propiedad de ¡Afiliamos Ya! / Multiservice Colombia y no
            puede reproducirse sin autorización previa.
          </p>

          <h2>8. Limitación de responsabilidad</h2>
          <p>
            ¡Afiliamos Ya! no es responsable por cambios normativos posteriores a la
            publicación de este sitio que afecten los valores de referencia
            mostrados en la calculadora, ni por decisiones que las EPS, AFP, ARL o
            Cajas de Compensación tomen de forma autónoma sobre tu afiliación.
          </p>

          <h2>9. Modificaciones</h2>
          <p>
            Podemos actualizar estos términos en cualquier momento. La versión
            vigente siempre estará disponible en esta página.
          </p>

          <h2>10. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Colombia.
          </p>
        </div>
      </div>
    </section>
  );
}
