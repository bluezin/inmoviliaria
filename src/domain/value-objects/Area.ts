export class Area {
  private constructor(readonly squareMeters: number) {}

  static create(squareMeters: number): Area {
    if (!Number.isFinite(squareMeters) || squareMeters <= 0) {
      throw new Error(`Area must be a positive finite number. Received: ${squareMeters}`);
    }
    return new Area(squareMeters);
  }

  /** Formatted area, e.g. "185 m²" */
  toFormatted(locale = "es-PE"): string {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(this.squareMeters)} m²`;
  }
}