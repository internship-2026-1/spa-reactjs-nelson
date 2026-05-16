export class DateUtils {
  static defaultLocale = 'es-GT';

  static toDate(date) {
    if (date instanceof Date) {
      return date;
    }

    if (typeof date === 'string' || typeof date === 'number') {
      return new Date(date);
    }

    return new Date('');
  }

  static isValid(date) {
    const parsedDate = this.toDate(date);

    return parsedDate instanceof Date && !Number.isNaN(parsedDate.getTime());
  }

  static format(date, locale = this.defaultLocale, options = {}) {
    if (!this.isValid(date)) {
      return '';
    }

    const parsedDate = this.toDate(date);

    const defaultOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    try {
      return new Intl.DateTimeFormat(locale, {
        ...defaultOptions,
        ...options,
      }).format(parsedDate);
    } catch (error) {
      return '';
    }
  }

  static toIso(date) {
    if (!this.isValid(date)) {
      return '';
    }

    try {
      return this.toDate(date).toISOString();
    } catch (error) {
      return '';
    }
  }

  static isBefore(a, b) {
    if (!this.isValid(a) || !this.isValid(b)) {
      return false;
    }

    return this.toDate(a).getTime() < this.toDate(b).getTime();
  }

  static isAfter(a, b) {
    if (!this.isValid(a) || !this.isValid(b)) {
      return false;
    }

    return this.toDate(a).getTime() > this.toDate(b).getTime();
  }
}