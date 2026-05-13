import { StringUtils } from './StringUtils.js';

export class ValidationUtils {
  static isRequired(value) {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      return StringUtils.normalizeSpaces(value).length > 0;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return true;
  }

  static isEmail(value) {
    const normalizedValue = StringUtils.normalizeSpaces(value).toLowerCase();

    if (!normalizedValue) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return emailRegex.test(normalizedValue);
  }

  static minLength(value, min) {
    const normalizedValue = StringUtils.normalizeSpaces(value);
    const safeMin = Number(min);

    if (!Number.isFinite(safeMin) || safeMin < 0) {
      return false;
    }

    return normalizedValue.length >= safeMin;
  }

  static maxLength(value, max) {
    const normalizedValue = StringUtils.normalizeSpaces(value);
    const safeMax = Number(max);

    if (!Number.isFinite(safeMax) || safeMax < 0) {
      return false;
    }

    return normalizedValue.length <= safeMax;
  }

  static isPhone(value, country = 'GT') {
    const normalizedValue = StringUtils.normalizeSpaces(value);

    if (!normalizedValue) {
      return false;
    }

    const onlyDigits = normalizedValue.replace(/\D/g, '');

    const phoneRules = {
      GT: /^[2-7]\d{7}$/,
      US: /^\d{10}$/,
      DEFAULT: /^\d{7,15}$/,
    };

    const selectedRule = phoneRules[country] || phoneRules.DEFAULT;

    return selectedRule.test(onlyDigits);
  }
}