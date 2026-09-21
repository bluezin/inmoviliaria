import type { Property } from "@/domain/entities/Property";
import { PropertyCard } from "@/components/properties/PropertyCard";
import styles from "./PropertyGrid.module.css";

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No encontramos propiedades</p>
        <p className={styles.emptyText}>
          Prueba ajustando los filtros o elimina la búsqueda para ver más resultados.
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {properties.map((property) => (
        <li key={property.id}>
          <PropertyCard property={property} />
        </li>
      ))}
    </ul>
  );
}