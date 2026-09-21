import { ListingStatus, PropertyType } from "@/domain/entities/Property";

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  [PropertyType.APARTMENT]: "Departamento",
  [PropertyType.HOUSE]: "Casa",
  [PropertyType.LOT]: "Terreno",
  [PropertyType.OFFICE]: "Oficina",
};

export const LISTING_STATUS_LABELS: Record<ListingStatus, string> = {
  [ListingStatus.SALE]: "Venta",
  [ListingStatus.RENT]: "Alquiler",
};

export function formatPublishedAt(iso: string, locale = "es-PE"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatPhone(phone: string): string {
  return phone.replace(/ /g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}