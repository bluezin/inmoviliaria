import type { PropertyRepository } from "@/application/ports/PropertyRepository";

export class GetCities {
  constructor(private readonly repository: PropertyRepository) {}

  async run(): Promise<string[]> {
    return this.repository.findCities();
  }
}