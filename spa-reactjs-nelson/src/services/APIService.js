import { config } from "../config/index.js";
import { UrlUtils } from "../common/utils/index.js";
import { sessionStorageService } from "./SessionStorageService.js";

class APIService {
  static instance = null;

  constructor() {
    if (APIService.instance) {
      return APIService.instance;
    }

    this.baseUrl = config.api.baseUrl;
    this.timeout = config.api.timeout;

    APIService.instance = this;
  }

  static getInstance() {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }

    return APIService.instance;
  }

  getToken() {
    return sessionStorageService.get("jwt", null);
  }

  buildHeaders(customHeaders = {}) {
    const token = this.getToken();

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": config.api.apiKey,
      "x-origin": config.api.origin,
      ...customHeaders,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  buildUrl(endpoint, queryParams = null) {
    const url = UrlUtils.join(this.baseUrl, endpoint);

    if (!queryParams) {
      return url;
    }

    return UrlUtils.withQuery(url, queryParams);
  }

  createTimeoutController() {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.timeout);

    return {
      controller,
      timeoutId,
    };
  }

  async request(method, endpoint, options = {}) {
    const {
      body = null,
      queryParams = null,
      headers = {},
      timeout = this.timeout,
      ...restOptions
    } = options;

    const url = this.buildUrl(endpoint, queryParams);

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    const requestConfig = {
      method,
      headers: this.buildHeaders(headers),
      signal: controller.signal,
      ...restOptions,
    };

    if (body !== null && body !== undefined) {
      requestConfig.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, requestConfig);

      const data = await this.parseResponse(response);

      if (!response.ok) {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          data,
        });
      }

      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        return Promise.reject({
          status: 408,
          statusText: "Request Timeout",
          message: "La petición excedió el tiempo máximo permitido.",
        });
      }

      return Promise.reject(error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async parseResponse(response) {
    const contentType = response.headers.get("content-type");

    if (response.status === 204) {
      return null;
    }

    if (contentType && contentType.includes("application/json")) {
      try {
        return await response.json();
      } catch (error) {
        return null;
      }
    }

    try {
      return await response.text();
    } catch (error) {
      return null;
    }
  }

  get(endpoint, options = {}) {
    return this.request("GET", endpoint, options);
  }

  post(endpoint, body = {}, options = {}) {
    return this.request("POST", endpoint, {
      ...options,
      body,
    });
  }

  put(endpoint, body = {}, options = {}) {
    return this.request("PUT", endpoint, {
      ...options,
      body,
    });
  }

  patch(endpoint, body = {}, options = {}) {
    return this.request("PATCH", endpoint, {
      ...options,
      body,
    });
  }

  delete(endpoint, options = {}) {
    return this.request("DELETE", endpoint, options);
  }
}

export const apiService = APIService.getInstance();

export default apiService;
