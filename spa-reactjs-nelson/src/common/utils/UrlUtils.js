export class UrlUtils {
  static buildQuery(params = {}) {
    if (!params || typeof params !== 'object') {
      return '';
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined && item !== null && item !== '') {
            searchParams.append(key, item);
          }
        });

        return;
      }

      searchParams.set(key, value);
    });

    return searchParams.toString();
  }

  static parseQuery(search = '') {
    const queryString = String(search).startsWith('?') ? String(search).slice(1) : String(search);

    const searchParams = new URLSearchParams(queryString);

    const result = {};

    searchParams.forEach((value, key) => {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        if (Array.isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }

        return;
      }

      result[key] = value;
    });

    return result;
  }

  static join(base = '', path = '') {
    const safeBase = String(base || '');
    const safePath = String(path || '');

    if (!safeBase && !safePath) {
      return '';
    }

    if (!safeBase) {
      return safePath;
    }

    if (!safePath) {
      return safeBase;
    }

    return `${safeBase.replace(/\/+$/, '')}/${safePath.replace(/^\/+/, '')}`;
  }

  static withQuery(url = '', params = {}) {
    const safeUrl = String(url || '');

    if (!safeUrl) {
      return '';
    }

    const [baseUrl, currentQuery = ''] = safeUrl.split('?');

    const currentParams = this.parseQuery(currentQuery);
    const mergedParams = {
      ...currentParams,
      ...params,
    };

    const query = this.buildQuery(mergedParams);

    if (!query) {
      return baseUrl;
    }

    return `${baseUrl}?${query}`;
  }
}