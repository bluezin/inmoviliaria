import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <Container className={styles.container}>
      <div className={styles.card}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.text}>
          La página que buscas no existe o fue movida.
        </p>
        <div className={styles.actions}>
          <Button href="/">Volver al inicio</Button>
          <Button href="/properties" variant="secondary">
            Ver propiedades
          </Button>
        </div>
      </div>
    </Container>
  );
}