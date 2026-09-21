"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { ListingStatus, PropertyType } from "@/domain/entities/Property";
import { PROPERTY_TYPE_LABELS } from "@/lib/labels";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./PropertyFilters.module.css";

type SortOption = "newest" | "price-asc" | "price-desc";

export interface PropertyFiltersState {
  q: string;
  city: string;
  type: string;
  status: string;
  bedroomCount: string;
  sort: SortOption;
}

interface PropertyFiltersProps {
  initialFilters: PropertyFiltersState;
  cities: string[];
  total: number;
}

const TYPE_OPTIONS = Object.values(PropertyType);
const STATUS_OPTIONS = Object.values(ListingStatus);
const BED_OPTIONS = [1, 2, 3, 4, 5];

function parseFilter(raw: PropertyFiltersState): PropertyFiltersState {
  return {
    q: raw.q ?? "",
    city: raw.city ?? "",
    type: raw.type ?? "",
    status: raw.status ?? "",
    bedroomCount: raw.bedroomCount ?? "",
    sort: raw.sort ?? "newest",
  };
}

export function PropertyFilters({ initialFilters, cities, total }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const filters = parseFilter(initialFilters);

  function updateUrl(next: Partial<PropertyFiltersState>) {
    const params = new URLSearchParams();
    const merged = { ...filters, ...next };

    Object.entries(merged).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    updateUrl({ [name]: value } as Partial<PropertyFiltersState>);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = new FormData(event.currentTarget).get("q") as string;
    updateUrl({ q: input ?? "" });
  }

  function handleReset() {
    router.replace(pathname, { scroll: false });
  }

  const hasFilters = Boolean(
    filters.q ||
      filters.city ||
      filters.type ||
      filters.status ||
      filters.bedroomCount ||
      filters.sort !== "newest",
  );

  return (
    <section className={styles.section}>
      <form className={styles.searchBar} onSubmit={handleSearch} role="search">
        <label className={styles.searchField}>
          <Icon name="search" size={20} />
          <input
            type="search"
            name="q"
            defaultValue={filters.q}
            placeholder="Buscar por ciudad, título o palabra clave…"
            aria-label="Buscar propiedades"
            className={styles.searchInput}
          />
        </label>
        <Button
          size="md"
          className={styles.searchButton}
          buttonProps={{ type: "submit" }}
        >
          Buscar
        </Button>
      </form>

      <div className={styles.filters}>
        <label className={styles.field}>
          <span className={styles.label}>Ciudad</span>
          <select name="city" value={filters.city} onChange={handleChange}>
            <option value="">Todas</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Tipo</span>
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">Todos</option>
            {TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {PROPERTY_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Operación</span>
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">Todas</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status === ListingStatus.SALE ? "Venta" : "Alquiler"}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Dormitorios</span>
          <select name="bedroomCount" value={filters.bedroomCount} onChange={handleChange}>
            <option value="">Cualquiera</option>
            {BED_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count}+ dorm.
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Ordenar</span>
          <select name="sort" value={filters.sort} onChange={handleChange}>
            <option value="newest">Más recientes</option>
            <option value="price-asc">Precio menor</option>
            <option value="price-desc">Precio mayor</option>
          </select>
        </label>

        {hasFilters ? (
          <button type="button" className={styles.reset} onClick={handleReset}>
            Restablecer
          </button>
        ) : null}
      </div>

      <p className={styles.count} aria-live="polite">
        {total === 0 ? "Sin resultados" : total === 1 ? "1 propiedad encontrada" : `${total} propiedades encontradas`}
      </p>
    </section>
  );
}