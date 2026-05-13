const requiredEnvVariables = [
  'VITE_APP_NAME',
  'VITE_API_BASE_URL',
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

export const env = {
  appName: getEnvVariable('VITE_APP_NAME'),
  apiBaseUrl: getEnvVariable('VITE_API_BASE_URL'),
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export function validateEnv() {
  requiredEnvVariables.forEach((key) => {
    getEnvVariable(key);
  });
}