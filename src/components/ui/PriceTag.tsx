import { ListingStatus } from "@/domain/entities/Property";
import type { Price } from "@/domain/value-objects/Price";
import styles from "./PriceTag.module.css";

interface PriceTagProps {
  price: Price;
  status: ListingStatus;
}

export function PriceTag({ price, status }: PriceTagProps) {
  const suffix = status === ListingStatus.RENT ? "/mes" : "";
  return (
    <p className={styles.price}>
      {price.toFormatted()}
      {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
    </p>
  );
}