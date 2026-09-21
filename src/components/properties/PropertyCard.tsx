import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/domain/entities/Property";
import { LISTING_STATUS_LABELS, PROPERTY_TYPE_LABELS } from "@/lib/labels";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { PriceTag } from "@/components/ui/PriceTag";
import styles from "./PropertyCard.module.css";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/properties/${property.id}`} className={styles.mediaLink}>
        <div className={styles.media}>
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />
          <div className={styles.badges}>
            <Badge tone="primary">{PROPERTY_TYPE_LABELS[property.type]}</Badge>
            <Badge tone={property.status === "sale" ? "accent" : "success"}>
              en {LISTING_STATUS_LABELS[property.status]}
            </Badge>
          </div>
        </div>
      </Link>

      <div className={styles.body}>
        <PriceTag price={property.price} status={property.status} />
        <h3 className={styles.title}>
          <Link href={`/properties/${property.id}`}>{property.title}</Link>
        </h3>
        <p className={styles.location}>
          <Icon name="pin" size={16} />
          <span>
            {property.address.city}, {property.address.state}
          </span>
        </p>

        <ul className={styles.features} aria-label="Características">
          {property.bedroomCount > 0 ? (
            <li>
              <Icon name="bed" size={18} />
              <span>{property.bedroomCount} Dorm.</span>
            </li>
          ) : null}
          {property.bathroomCount > 0 ? (
            <li>
              <Icon name="bath" size={18} />
              <span>{property.bathroomCount} Baños</span>
            </li>
          ) : null}
          <li>
            <Icon name="area" size={18} />
            <span>{property.area.toFormatted()}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}