import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import styles from "./not-found.module.css";

export default function PropertyNotFound() {
  return (
    <Container className={styles.container}>
      <div className={styles.card}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Propiedad no encontrada</h1>
        <p className={styles.text}>
          La propiedad que buscas no existe o ya no está disponible.
        </p>
        <div className={styles.actions}>
          <Button href="/properties">Ver todas las propiedades</Button>
          <Button href="/" variant="secondary">
            Ir al inicio
          </Button>
        </div>
      </div>
    </Container>
  );
}