import ServicioPage from "@/components/ServicioPage";

export const metadata = {
  title: "Salud",
  description:
    "Afiliación, traslados, reingresos y novedades ante tu EPS. Acompañamiento en Salud para independientes y dependientes.",
  openGraph: { url: "/salud" },
};

const SERVICIOS = [
  "Afiliaciones a EPS",
  "Traslados de EPS",
  "Reingresos",
  "Novedades",
  "Inclusión de beneficiarios, cuando corresponda",
  "Gestión relacionada con aportes a Salud",
];

export default function Page() {
  return (
    <ServicioPage
      eyebrow="Salud"
      title="Afiliación y gestión en Salud"
      image="/images/salud-hero.jpg"
      titleColor="#fff"
      imagePosition="center 15%"
      lede="La Salud es uno de los componentes fundamentales del Sistema de Seguridad Social. En Afiliamos Ya brindamos acompañamiento en procesos relacionados con la afiliación y gestión ante las EPS, de acuerdo con la situación particular de cada persona."
      sectionMinHeight="680px"
      servicios={SERVICIOS}
      closing="Te ayudamos a entender y gestionar correctamente tu afiliación."
      ctaTexto="¿Necesitas gestionar tu afiliación a Salud? Déjanos tus datos y uno de nuestros asesores se pondrá en contacto contigo."
      ctaMensaje="Hola ¡Afiliamos Ya!, quiero información sobre mi afiliación a Salud (EPS). Autorizo que me contacten por este medio."
      ctaBoton="Solicitar información"
    />
  );
}
