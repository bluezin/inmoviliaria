import { CtaBanner } from "@/components/home/CtaBanner";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Stats } from "@/components/home/Stats";
import { getPropertyCatalog } from "@/infrastructure/composition-root";

export default async function HomePage() {
  const catalog = getPropertyCatalog();
  const featured = await catalog.getFeatured.run(6);

  return (
    <>
      <Hero />
      <Stats />
      <FeaturedListings properties={featured} />
      <Services />
      <CtaBanner />
    </>
  );
}