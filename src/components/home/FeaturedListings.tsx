import type { Property } from "@/domain/entities/Property";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./FeaturedListings.module.css";

interface FeaturedListingsProps {
  properties: Property[];
}

export function FeaturedListings({ properties }: FeaturedListingsProps) {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Destacados"
          title="Propiedades seleccionadas para ti"
          description="Una selección curada con las mejores oportunidades en las zonas más solicitadas del país."
          align="left"
        >
          <Button href="/properties" variant="secondary">
            Ver todas
            <Icon name="arrow-right" size={16} />
          </Button>
        </SectionHeading>
        <PropertyGrid properties={properties} />
      </Container>
    </section>
  );
}