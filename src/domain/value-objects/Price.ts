export const PRICE_CURRENCY = "USD";

export class Price {
  private constructor(
    readonly amount: number,
    readonly currency: string = PRICE_CURRENCY,
  ) {}

  static create(amount: number, currency: string = PRICE_CURRENCY): Price {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error(`Price must be a non-negative finite number. Received: ${amount}`);
    }
    return new Price(amount, currency);
  }

  hasEqualValue(other: Price): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /** Formatted price, e.g. "US$ 320,000" */
  toFormatted(locale = "es-PE"): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this.currency,
      maximumFractionDigits: 0,
    }).format(this.amount);
  }
}