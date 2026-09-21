import { GetCities } from "@/application/use-cases/GetCities";
import { GetFeaturedProperties } from "@/application/use-cases/GetFeaturedProperties";
import { GetPropertyById } from "@/application/use-cases/GetPropertyById";
import { SearchProperties } from "@/application/use-cases/SearchProperties";
import { InMemoryPropertyRepository } from "@/infrastructure/adapters/properties/InMemoryPropertyRepository";
import { mockProperties } from "@/infrastructure/data/mock-properties";

const repository = new InMemoryPropertyRepository(mockProperties);

export interface PropertyCatalog {
  getFeatured: GetFeaturedProperties;
  getById: GetPropertyById;
  search: SearchProperties;
  getCities: GetCities;
}

let catalog: PropertyCatalog | null = null;

export function getPropertyCatalog(): PropertyCatalog {
  if (catalog) return catalog;
  catalog = {
    getFeatured: new GetFeaturedProperties(repository),
    getById: new GetPropertyById(repository),
    search: new SearchProperties(repository),
    getCities: new GetCities(repository),
  };
  return catalog;
}