import { EMAIL, PHONE_DISPLAY } from "@/lib/site";
import homeStyles from "@/components/Home.module.css";
import styles from "@/components/Legal.module.css";

export const metadata = {
  title: "Términos y Condiciones",
  description: "Condiciones de uso del sitio web de ¡Afiliamos Ya! y de sus servicios de gestión de Seguridad Social.",
  openGraph: { url: "/terminos" },
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

          <h2>4. Uso del sitio</h2>
          <p>
            Te comprometes a usar este sitio de forma lícita y a suministrar
            información veraz en los formularios de contacto y afiliación. Nos
            reservamos el derecho de verificar la información suministrada antes de
            continuar con cualquier proceso de gestión.
          </p>

          <h2>5. Canales de contacto</h2>
          <p>
            El canal principal de atención es WhatsApp, al número {PHONE_DISPLAY}.
            También puedes escribirnos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            Buscamos responder en menos de 30 minutos en horario hábil.
          </p>

          <h2>6. Propiedad intelectual</h2>
          <p>
            El contenido de este sitio — textos, logo, diseño y demás elementos
            gráficos — es propiedad de ¡Afiliamos Ya! / Multiservice Colombia y no
            puede reproducirse sin autorización previa.
          </p>

          <h2>7. Limitación de responsabilidad</h2>
          <p>
            ¡Afiliamos Ya! no es responsable por cambios normativos posteriores a la
            publicación de este sitio que afecten los valores de referencia
            mostrados en la calculadora, ni por decisiones que las EPS, AFP, ARL o
            Cajas de Compensación tomen de forma autónoma sobre tu afiliación.
          </p>

          <h2>8. Modificaciones</h2>
          <p>
            Podemos actualizar estos términos en cualquier momento. La versión
            vigente siempre estará disponible en esta página.
          </p>

          <h2>9. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Colombia.
          </p>
        </div>
      </div>
    </section>
  );
}
