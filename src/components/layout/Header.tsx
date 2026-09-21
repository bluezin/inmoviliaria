"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/properties" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/#contacto" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="InMoviliaria - inicio">
          <span className={styles.brandMark}>
            <Icon name="home" size={18} />
          </span>
          <span className={styles.brandName}>
            In<strong>Moviliaria</strong>
          </span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Principal">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            href="/properties"
            size="sm"
            className={styles.navCta}
            anchorProps={{ onClick: () => setMenuOpen(false) }}
          >
            Ver propiedades
          </Button>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={24} />
        </button>
      </Container>
    </header>
  );
}