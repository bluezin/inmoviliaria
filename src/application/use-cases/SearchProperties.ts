import type {
  PropertySearchCriteria,
  PropertySearchResult,
} from "@/application/ports/PropertyRepository";
import type { PropertyRepository } from "@/application/ports/PropertyRepository";

export class SearchProperties {
  constructor(private readonly repository: PropertyRepository) {}

  async run(criteria: PropertySearchCriteria): Promise<PropertySearchResult> {
    return this.repository.search(criteria);
  }
}