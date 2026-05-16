import { config } from '../config/index.js';

export class BaseStorageService {
  constructor(storage, namespace = config.app.namespace) {
    this.storage = storage;
    this.namespace = namespace;
  }

  buildKey(key) {
    return `${this.namespace}:${key}`;
  }

  serialize(value) {
    try {
      return JSON.stringify({
        value,
        type: typeof value,
      });
    } catch (error) {
      return JSON.stringify({
        value: null,
        type: 'null',
      });
    }
  }

  deserialize(rawValue, fallback = null) {
    if (rawValue === null || rawValue === undefined) {
      return fallback;
    }

    try {
      const parsedValue = JSON.parse(rawValue);

      if (
        parsedValue &&
        Object.prototype.hasOwnProperty.call(parsedValue, 'value')
      ) {
        return parsedValue.value;
      }

      return parsedValue;
    } catch (error) {
      return fallback;
    }
  }

  set(key, value) {
    try {
      const storageKey = this.buildKey(key);
      const serializedValue = this.serialize(value);

      this.storage.setItem(storageKey, serializedValue);

      return true;
    } catch (error) {
      return false;
    }
  }

  get(key, fallback = null) {
    try {
      const storageKey = this.buildKey(key);
      const rawValue = this.storage.getItem(storageKey);

      return this.deserialize(rawValue, fallback);
    } catch (error) {
      return fallback;
    }
  }

  remove(key) {
    try {
      const storageKey = this.buildKey(key);

      this.storage.removeItem(storageKey);

      return true;
    } catch (error) {
      return false;
    }
  }

  clearAppData() {
    try {
      const prefix = `${this.namespace}:`;
      const keysToRemove = [];

      for (let index = 0; index < this.storage.length; index += 1) {
        const key = this.storage.key(index);

        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => {
        this.storage.removeItem(key);
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  has(key) {
    try {
      const storageKey = this.buildKey(key);

      return this.storage.getItem(storageKey) !== null;
    } catch (error) {
      return false;
    }
  }
}