import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./Footer.module.css";

const SERVICE_LINKS = [
  { label: "Comprar propiedad", href: "/properties?status=sale" },
  { label: "Alquilar propiedad", href: "/properties?status=rent" },
  { label: "Terrenos", href: "/properties?type=lot" },
  { label: "Oficinas", href: "/properties?type=office" },
];

const COMPANY_LINKS = [
  { label: "Sobre nosotros", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Publicar propiedad", href: "/#contacto" },
];

const CONTACTS: Array<{ icon: IconName; label: string; value: string }> = [
  { icon: "phone", label: "Teléfono", value: "+51 (1) 555 0123" },
  { icon: "mail", label: "Email", value: "hola@inmoviliaria.pe" },
  { icon: "pin", label: "Oficina", value: "Av. Larco 452, Lima, Perú" },
];

export function Footer() {
  return (
    <footer className={styles.footer} id="contacto">
      <Container>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandMark}>
                <Icon name="home" size={18} />
              </span>
              <span className={styles.brandName}>
                In<strong>Moviliaria</strong>
              </span>
            </Link>
            <p className={styles.blurb}>
              Somos tu aliado para comprar, vender o alquilar el hogar perfecto.
              Asesoría inmobiliaria con respaldo y confianza desde 2010.
            </p>
            <ul className={styles.contacts}>
              {CONTACTS.map((contact) => (
                <li key={contact.label} className={styles.contactItem}>
                  <Icon name={contact.icon} size={18} />
                  <span>
                    <strong>{contact.label}:</strong> {contact.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.col} aria-label="Propiedades">
            <h3 className={styles.colTitle}>Propiedades</h3>
            <ul className={styles.links}>
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Compañía">
            <h3 className={styles.colTitle}>Compañía</h3>
            <ul className={styles.links}>
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} InMoviliaria. Todos los derechos
            reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
