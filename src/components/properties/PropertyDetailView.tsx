import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/domain/entities/Property";
import { formatPhone, LISTING_STATUS_LABELS, PROPERTY_TYPE_LABELS } from "@/lib/labels";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { PriceTag } from "@/components/ui/PriceTag";
import styles from "./PropertyDetailView.module.css";

interface PropertyDetailViewProps {
  property: Property;
}

interface DetailItem {
  icon: "bed" | "bath" | "area" | "hotel";
  label: string;
  value: string;
}

export function PropertyDetailView({ property }: PropertyDetailViewProps) {
  const details: DetailItem[] = [
    { icon: "bed", label: "Dormitorios", value: String(property.bedroomCount) },
    { icon: "bath", label: "Baños", value: String(property.bathroomCount) },
    { icon: "area", label: "Área", value: property.area.toFormatted() },
    { icon: "hotel", label: "Parqueo", value: String(property.parkingSpots) },
  ];

  return (
    <div className={styles.page}>
      <Link href="/properties" className={styles.back}>
        <Icon name="arrow-right" size={16} />
        Volver a propiedades
      </Link>

      <div className={styles.header}>
        <div>
          <div className={styles.badges}>
            <Badge tone="primary">{PROPERTY_TYPE_LABELS[property.type]}</Badge>
            <Badge tone={property.status === "sale" ? "accent" : "success"}>
              en {LISTING_STATUS_LABELS[property.status]}
            </Badge>
            {property.featured ? <Badge tone="neutral">Destacado</Badge> : null}
          </div>
          <h1 className={styles.title}>{property.title}</h1>
          <p className={styles.location}>
            <Icon name="pin" size={18} />
            {property.address.street}, {property.address.city}, {property.address.state}
          </p>
        </div>
        <div className={styles.priceBox}>
          <PriceTag price={property.price} status={property.status} />
          <span className={styles.priceNote}>
            Publicado el {formatPublishedDate(property.publishedAt)}
          </span>
        </div>
      </div>

      <PropertyGallery title={property.title} images={property.images} />

      <div className={styles.body}>
        <div className={styles.mainCol}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Características</h2>
            <ul className={styles.details}>
              {details.map((detail) => (
                <li key={detail.label} className={styles.detailItem}>
                  <span className={styles.detailIcon}>
                    <Icon name={detail.icon} size={20} />
                  </span>
                  <div>
                    <span className={styles.detailValue}>{detail.value}</span>
                    <span className={styles.detailLabel}>{detail.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Descripción</h2>
            <p className={styles.description}>{property.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Comodidades</h2>
            <ul className={styles.amenities}>
              {property.amenities.map((amenity) => (
                <li key={amenity} className={styles.amenity}>
                  <Icon name="sparkles" size={16} />
                  {amenity}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className={styles.sideCol}>
          <section className={styles.agentCard}>
            <h2 className={styles.sectionTitle}>Asesor a cargo</h2>
            <div className={styles.agent}>
              <Image
                src={property.agent.avatar}
                alt={property.agent.name}
                width={56}
                height={56}
                className={styles.agentAvatar}
              />
              <div>
                <p className={styles.agentName}>{property.agent.name}</p>
                <p className={styles.agentRole}>Asesor inmobiliario</p>
              </div>
            </div>
            <ul className={styles.agentContacts}>
              <li>
                <a href={`tel:${property.agent.phone}`}>
                  <Icon name="phone" size={17} />
                  {formatPhone(property.agent.phone)}
                </a>
              </li>
              <li>
                <a href={`mailto:${property.agent.email}`}>
                  <Icon name="mail" size={17} />
                  {property.agent.email}
                </a>
              </li>
            </ul>
            <p className={styles.agentNote}>
              Agendar una visita no tiene costo. Te esperamos.
            </p>
          </section>

          <section className={styles.infoCard}>
            <h2 className={styles.sectionTitle}>Referencia</h2>
            <dl className={styles.infoList}>
              <div>
                <dt>Código</dt>
                <dd>{property.id.toUpperCase()}</dd>
              </div>
              <div>
                <dt>Ubicación</dt>
                <dd>
                  {property.address.city}, {property.address.state},{" "}
                  {property.address.country}
                </dd>
              </div>
              <div>
                <dt>Ubigeo</dt>
                <dd>{property.address.zip}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}

function formatPublishedDate(iso: string): string {
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}