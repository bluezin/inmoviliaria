import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import styles from "./Hero.module.css";

const HERO_QUICK_LINKS = [
  { label: "Comprar", href: "/properties?status=sale" },
  { label: "Alquilar", href: "/properties?status=rent" },
  { label: "Terrenos", href: "/properties?type=lot" },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Portal inmobiliario N.°1 en Perú</span>
          <h1 className={styles.title}>
            Encuentra el <em>hogar</em> que siempre soñaste
          </h1>
          <p className={styles.subtitle}>
            Casas, departamentos, terrenos y oficinas en venta y alquiler.
            Explora nuestra selección curada con precios claros y asesoría experta.
          </p>

          <div className={styles.actions}>
            <Button href="/properties" size="lg">
              Explorar propiedades
              <Icon name="arrow-right" size={18} />
            </Button>
          </div>

          <ul className={styles.quickLinks}>
            {HERO_QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.quickLink}>
                  {link.label}
                  <Icon name="arrow-right" size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.gallery} aria-hidden="true">
          <div className={`${styles.galleryItem} ${styles.itemLarge}`} />
          <div className={`${styles.galleryItem} ${styles.itemSmall}`} />
          <div className={`${styles.galleryItem} ${styles.itemSmall}`} />
        </div>
      </Container>
    </section>
  );
}