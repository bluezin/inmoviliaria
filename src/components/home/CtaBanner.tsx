import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import styles from "./CtaBanner.module.css";

export function CtaBanner() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.banner}>
          <div className={styles.content}>
            <h2 className={styles.title}>¿Tienes una propiedad? Publica gratis</h2>
            <p className={styles.text}>
              Publica tu propiedad en minutos y llega a miles de compradores y
              arrendatarios. Asesoría personalizada incluida.
            </p>
            <Button href="/#contacto" variant="secondary" size="lg">
              Publicar mi propiedad
              <Icon name="arrow-right" size={18} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}