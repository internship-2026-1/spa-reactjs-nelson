import { apiService, localStorageService, sessionStorageService } from './services/index.js';
import { useEffect } from 'react';

function App() {
  localStorageService.set('settings', {
    theme: 'dark',
    language: 'es',
  });

  sessionStorageService.set('jwt', 'fake-jwt-token');

  const settings = localStorageService.get('settings', {});
  const token = sessionStorageService.get('jwt', null);

  console.log('Settings:', settings);
  console.log('Token:', token);
  console.log('API instance:', apiService);

   useEffect(() => {
    apiService
      .get('/api/v1/test')
      .then((response) => {
        console.log('Respuesta API:', response);
      })
      .catch((error) => {
        console.error('Error API:', error);
      });
  }, []);

  return (
    <div>
      <h1>Servicios base</h1>

      <h2>localStorage</h2>
      <pre>{JSON.stringify(settings, null, 2)}</pre>

      <h2>sessionStorage</h2>
      <p>{token}</p>

      <h1>Probando APIService</h1>

      
    </div>
  );
}

export default App;