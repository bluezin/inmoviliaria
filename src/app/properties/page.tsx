import type { Metadata } from "next";
import type { PropertyFiltersState } from "@/components/properties/PropertyFilters";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { Container } from "@/components/ui/Container";
import { ListingStatus, PropertyType } from "@/domain/entities/Property";
import { getPropertyCatalog } from "@/infrastructure/composition-root";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Propiedades en venta y alquiler",
  description:
    "Explora casas, departamentos, terrenos y oficinas en venta y alquiler. Filtra por ciudad, tipo y precio.",
};

type SortValue = PropertyFiltersState["sort"];

function parseSort(value: string | string[] | undefined): SortValue {
  return value === "price-asc" || value === "price-desc" ? value : "newest";
}

function isPropertyType(value: string | undefined): value is PropertyType {
  return Object.values(PropertyType).includes(value as PropertyType);
}

function isListingStatus(value: string | undefined): value is ListingStatus {
  return Object.values(ListingStatus).includes(value as ListingStatus);
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = await searchParams;
  const catalog = getPropertyCatalog();

  const filters: PropertyFiltersState = {
    q: typeof resolved.q === "string" ? resolved.q : "",
    city: typeof resolved.city === "string" ? resolved.city : "",
    type: typeof resolved.type === "string" ? resolved.type : "",
    status: typeof resolved.status === "string" ? resolved.status : "",
    bedroomCount: typeof resolved.bedroomCount === "string" ? resolved.bedroomCount : "",
    sort: parseSort(resolved.sort),
  };

  const [result, cities] = await Promise.all([
    catalog.search.run({
      q: filters.q || undefined,
      city: filters.city || undefined,
      type: isPropertyType(filters.type) ? filters.type : undefined,
      status: isListingStatus(filters.status) ? filters.status : undefined,
      bedroomCount: filters.bedroomCount ? Number(filters.bedroomCount) : undefined,
      sort: filters.sort,
    }),
    catalog.getCities.run(),
  ]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <h1 className={styles.title}>Explora nuestras propiedades</h1>
          <p className={styles.subtitle}>
            Filtra por ciudad, tipo y precio para encontrar la propiedad perfecta.
          </p>
        </Container>
      </section>

      <Container className={styles.content}>
        <PropertyFilters initialFilters={filters} cities={cities} total={result.total} />
        <PropertyGrid properties={result.items} />
      </Container>
    </div>
  );
}