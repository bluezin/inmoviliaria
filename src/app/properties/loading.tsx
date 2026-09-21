import styles from "./loading.module.css";

export default function PropertiesLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heroSkeleton} />
      <div className={styles.body}>
        <div className={styles.searchSkeleton} />
        <div className={styles.filtersSkeleton}>
          <div className={styles.filterSkeleton} />
          <div className={styles.filterSkeleton} />
          <div className={styles.filterSkeleton} />
          <div className={styles.filterSkeleton} />
        </div>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.media} />
              <div className={styles.cardBody}>
                <div className={styles.lineShort} />
                <div className={styles.line} />
                <div className={styles.lineMedium} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className={styles.srOnly}>Cargando propiedades…</span>
    </div>
  );
}