"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./PropertyGallery.module.css";

interface PropertyGalleryProps {
  title: string;
  images: string[];
}

export function PropertyGallery({ title, images }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <Image
          src={current}
          alt={`${title} — imagen ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className={styles.mainImage}
        />
      </div>

      {images.length > 1 ? (
        <div className={styles.thumbnails} role="tablist" aria-label="Galería de imágenes">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Ver imagen ${index + 1}`}
              className={`${styles.thumb} ${index === active ? styles.thumbActive : ""}`}
              onClick={() => setActive(index)}
            >
              <Image src={image} alt="" fill sizes="120px" className={styles.thumbImage} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}