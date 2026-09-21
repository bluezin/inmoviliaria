import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./Stats.module.css";

interface Stat {
  icon: IconName;
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { icon: "home", value: "750+", label: "Propiedades publicadas" },
  { icon: "key", value: "1,200", label: "Familias felices" },
  { icon: "shield", value: "15 años", label: "De experiencia" },
  { icon: "sparkles", value: "4.9/5", label: "Valoración de clientes" },
];

export function Stats() {
  return (
    <section className={styles.stats}>
      <Container className={styles.inner}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.icon}>
              <Icon name={stat.icon} size={22} />
            </span>
            <strong className={styles.value}>{stat.value}</strong>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}