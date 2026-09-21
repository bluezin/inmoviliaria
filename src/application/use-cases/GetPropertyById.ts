import type { Property } from "@/domain/entities/Property";
import type { PropertyRepository } from "@/application/ports/PropertyRepository";

export class GetPropertyById {
  constructor(private readonly repository: PropertyRepository) {}

  async run(id: string): Promise<Property | null> {
    return this.repository.findById(id);
  }
}