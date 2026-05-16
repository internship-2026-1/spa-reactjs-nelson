export class NumberUtils {
  static defaultLocale = 'es-GT';

  static defaultCurrency = 'GTQ';

  static toSafeNumber(value) {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return 0;
    }

    return numberValue;
  }

  static formatCurrency(value, currency = this.defaultCurrency, locale = this.defaultLocale) {
    const safeValue = this.toSafeNumber(value);

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(safeValue);
    } catch (error) {
      return '';
    }
  }

  static formatPercent(value, decimals = 0) {
    const safeValue = this.toSafeNumber(value);
    const safeDecimals = Number.isInteger(decimals) && decimals >= 0 ? decimals : 0;

    return `${this.round(safeValue * 100, safeDecimals)}%`;
  }

  static round(value, decimals = 0) {
    const safeValue = this.toSafeNumber(value);
    const safeDecimals = Number.isInteger(decimals) && decimals >= 0 ? decimals : 0;

    const factor = 10 ** safeDecimals;

    return Math.round((safeValue + Number.EPSILON) * factor) / factor;
  }
}