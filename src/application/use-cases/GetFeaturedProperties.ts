import type { Property } from "@/domain/entities/Property";
import type { PropertyRepository } from "@/application/ports/PropertyRepository";

export class GetFeaturedProperties {
  constructor(private readonly repository: PropertyRepository) {}

  async run(limit = 6): Promise<Property[]> {
    return this.repository.findFeatured(limit);
  }
}