import { env, validateEnv } from './env.js';

validateEnv();

export const config = {
  app: {
    name: env.appName,
    namespace: env.appNamespace,
    environment: env.environment,
    isDevelopment: env.isDevelopment,
    isProduction: env.isProduction,
  },

  api: {
    baseUrl: env.apiBaseUrl,
    timeout: env.apiTimeout,
    apiKey: env.apiKey,
    origin: env.apiOrigin,
  },
};