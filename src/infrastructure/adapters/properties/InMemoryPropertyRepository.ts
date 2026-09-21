import type { PropertySearchCriteria, PropertyRepository } from "@/application/ports/PropertyRepository";
import type { Property } from "@/domain/entities/Property";
import { ListingStatus, PropertyType } from "@/domain/entities/Property";

const TYPE_VALUES = new Set<string>(Object.values(PropertyType));
const STATUS_VALUES = new Set<string>(Object.values(ListingStatus));

export class InMemoryPropertyRepository implements PropertyRepository {
  constructor(private readonly properties: Property[]) {}

  async findById(id: string): Promise<Property | null> {
    return this.properties.find((property) => property.id === id) ?? null;
  }

  async findFeatured(limit = 6): Promise<Property[]> {
    return this.properties
      .filter((property) => property.featured)
      .slice(0, limit);
  }

  async findCities(): Promise<string[]> {
    const cities = new Set(this.properties.map((property) => property.address.city));
    return Array.from(cities).sort((a, b) => a.localeCompare(b, "es"));
  }

  async search(criteria: PropertySearchCriteria): Promise<{ items: Property[]; total: number }> {
    let items = [...this.properties];
    const query = criteria.q?.trim().toLowerCase();

    if (query) {
      items = items.filter((property) =>
        [property.title, property.description, property.address.city, property.address.state]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }

    if (criteria.city) {
      items = items.filter((property) => property.address.city === criteria.city);
    }

    if (criteria.type && TYPE_VALUES.has(criteria.type)) {
      items = items.filter((property) => property.type === criteria.type);
    }

    if (criteria.status && STATUS_VALUES.has(criteria.status)) {
      items = items.filter((property) => property.status === criteria.status);
    }

    if (criteria.priceMin !== undefined) {
      items = items.filter((property) => property.price.amount >= criteria.priceMin!);
    }

    if (criteria.priceMax !== undefined) {
      items = items.filter((property) => property.price.amount <= criteria.priceMax!);
    }

    if (criteria.bedroomCount) {
      items = items.filter(
        (property) => property.bedroomCount >= criteria.bedroomCount!,
      );
    }

    switch (criteria.sort) {
      case "price-asc":
        items.sort((a, b) => a.price.amount - b.price.amount);
        break;
      case "price-desc":
        items.sort((a, b) => b.price.amount - a.price.amount);
        break;
      case "newest":
      default:
        items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
        break;
    }

    return { items, total: items.length };
  }
}