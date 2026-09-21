import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailView } from "@/components/properties/PropertyDetailView";
import { Container } from "@/components/ui/Container";
import { getPropertyCatalog } from "@/infrastructure/composition-root";

type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyCatalog().getById.run(id);

  if (!property) {
    return { title: "Propiedad no encontrada" };
  }

  return {
    title: property.title,
    description: property.description.slice(0, 155),
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyCatalog().getById.run(id);

  if (!property) {
    notFound();
  }

  return (
    <Container>
      <PropertyDetailView property={property} />
    </Container>
  );
}