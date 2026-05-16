import { BaseStorageService } from './BaseStorageService.js';

class SessionStorageService extends BaseStorageService {
  constructor() {
    super(window.sessionStorage);
  }
}

export const sessionStorageService = new SessionStorageService();