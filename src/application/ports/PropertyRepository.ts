import type { Property } from "@/domain/entities/Property";

export type PropertySearchSort = "price-asc" | "price-desc" | "newest";

export interface PropertySearchCriteria {
  q?: string;
  city?: string;
  type?: "apartment" | "house" | "lot" | "office";
  status?: "sale" | "rent";
  priceMin?: number;
  priceMax?: number;
  bedroomCount?: number;
  sort?: PropertySearchSort;
}

export interface PropertySearchResult {
  items: Property[];
  total: number;
}

/** Primary port (driving port) in the hexagonal architecture. */
export interface PropertyRepository {
  findById(id: string): Promise<Property | null>;
  findFeatured(limit?: number): Promise<Property[]>;
  search(criteria: PropertySearchCriteria): Promise<PropertySearchResult>;
  findCities(): Promise<string[]>;
}