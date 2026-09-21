import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Services.module.css";

interface Service {
  icon: IconName;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: "home",
    title: "Compra y venta",
    description:
      "Te acompañamos en cada paso para comprar o vender con la mejor valoración del mercado.",
  },
  {
    icon: "key",
    title: "Alquiler seguro",
    description:
      "Publica tu inmueble o encuentra el departamento ideal con contratos y respaldo legal.",
  },
  {
    icon: "area",
    title: "Terrenos y oficinas",
    description:
      "Inversiones en terrenos, locales comerciales y oficinas prime para negocios.",
  },
  {
    icon: "shield",
    title: "Asesoría legal y financiera",
    description:
      "Tasación, trámites notariales y asesoría de crédito hipotecario sin sorpresas.",
  },
  {
    icon: "sparkles",
    title: "Remodelación y staging",
    description:
      "Preparamos tu propiedad para vender más rápido y al mejor precio con home staging.",
  },
  {
    icon: "hotel",
    title: "Administración",
    description:
      "Gestión de alquileres, cobranza y mantenimiento para propietarios despreocupados.",
  },
];

export function Services() {
  return (
    <section className={styles.section} id="servicios">
      <Container>
        <SectionHeading
          eyebrow="Nuestros servicios"
          title="Todo lo que tu propiedad necesita"
          description="Desde comprar tu primera casa hasta administrar tus inversiones, tenemos una solución para cada momento."
        />
        <ul className={styles.grid}>
          {SERVICES.map((service) => (
            <li key={service.title} className={styles.card}>
              <span className={styles.icon}>
                <Icon name={service.icon} size={24} />
              </span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardText}>{service.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}