import type { Area } from "@/domain/value-objects/Area";
import type { Price } from "@/domain/value-objects/Price";

export enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
  LOT = "lot",
  OFFICE = "office",
}

export enum ListingStatus {
  SALE = "sale",
  RENT = "rent",
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: Price;
  type: PropertyType;
  status: ListingStatus;
  address: Address;
  area: Area;
  bedroomCount: number;
  bathroomCount: number;
  parkingSpots: number;
  images: string[];
  featured: boolean;
  amenities: string[];
  publishedAt: string;
  agent: Agent;
}