import { BaseStorageService } from './BaseStorageService.js';

class LocalStorageService extends BaseStorageService {
  constructor() {
    super(window.localStorage);
  }
}

export const localStorageService = new LocalStorageService();