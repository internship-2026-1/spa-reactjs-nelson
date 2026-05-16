const requiredEnvVariables = [
  'VITE_APP_NAME',
  'VITE_APP_NAMESPACE',
  'VITE_API_BASE_URL',
  'VITE_API_KEY',
  'VITE_API_ORIGIN',
];

function getEnvVariable(key) {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(
      `[ENV ERROR] La variable de entorno "${key}" es requerida y no fue definida.`
    );
  }

  return value;
}

function getOptionalEnvVariable(key, fallback = '') {
  return import.meta.env[key] || fallback;
}

function getNumberEnvVariable(key, fallback = 0) {
  const value = import.meta.env[key];

  if (!value) {
    return fallback;
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return numberValue;
}

export const env = {
  appName: getEnvVariable('VITE_APP_NAME'),
  appNamespace: getEnvVariable('VITE_APP_NAMESPACE'),

  apiBaseUrl: getEnvVariable('VITE_API_BASE_URL'),
  apiKey: getEnvVariable('VITE_API_KEY'),
  apiOrigin: getEnvVariable('VITE_API_ORIGIN'),
  apiTimeout: getNumberEnvVariable('VITE_API_TIMEOUT', 10000),

  environment: getOptionalEnvVariable('MODE', import.meta.env.MODE),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export function validateEnv() {
  requiredEnvVariables.forEach((key) => {
    getEnvVariable(key);
  });
}