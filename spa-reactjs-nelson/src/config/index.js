import { env, validateEnv } from './env.js';

validateEnv();

export const config = {
  app: {
    name: env.appName,
    environment: env.environment,
    isDevelopment: env.isDevelopment,
    isProduction: env.isProduction,
  },

  api: {
    baseUrl: env.apiBaseUrl,
  },
};