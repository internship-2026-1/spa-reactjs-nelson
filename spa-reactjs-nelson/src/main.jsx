import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {config} from "./config/index"
import './index.css'
import {StringUtils, DateUtils, NumberUtils, ValidationUtils, UrlUtils} from "./common/utils/index"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <h1>Variables de entorno</h1>
      <h2>{config.app.name}</h2>
      <h2>{config.app.environment}</h2>
      <h2>{config.api.baseUrl}</h2>
      <h1>String utils</h1>
      <p>{StringUtils.capitalize('hola mundo')}</p>
      <p>{StringUtils.toTitleCase('hola mundo')}</p>
      <p>{StringUtils.truncate('hola mundo', 3)}</p>
      <p>{StringUtils.normalizeSpaces('hola    m   undo')}</p>
      <h1>Date utils</h1>
      <p>{DateUtils.format(new Date())}</p>
      <p>{DateUtils.toIso(new Date())}</p>
      <p>{DateUtils.isBefore(new Date('2020-01-01'), new Date('2021-01-01')) ? 'Sí es antes' : 'No es antes'}</p>
      <p>{DateUtils.isBefore('2020-01-01', '2021-01-01') ? 'Sí es antes' : 'No es antes'}</p>
      <p>{DateUtils.isAfter('2021-01-01','2020-01-01') ? 'Sí es después' : 'No es después'}</p>
      <p>{DateUtils.isAfter('2021-01-01','2022-01-01') ? 'Sí es después' : 'No es después'}</p>
      <p>{DateUtils.isValid("01/02/2020") ? 'Sí es valido' : 'No es valido'}</p>
      <p>{DateUtils.isValid("mmgjhg") ? 'Sí es valido' : 'No es valido'}</p>
      <h1>Number utils</h1>
      <p>{NumberUtils.formatCurrency(1234.56)}</p>
      <p>{NumberUtils.formatPercent(0.7892, 4)}</p>
      <p>{NumberUtils.formatPercent(0.2554)}</p>
      <p>{NumberUtils.formatCurrency(1234.5, 'USD', 'en-US')}</p>
      <p>{NumberUtils.round(1.2345, 2)}</p>
      <h1>Validation utils</h1>
      <p>{ValidationUtils.isRequired('hola mundo') ? 'entro a True requerido' : 'Entro a falso, No es requerido'}</p>
      <p>{ValidationUtils.isRequired('') ? 'entro a True Sí es requerido' : 'entro a falso, Vacio'}</p>
      <p>{ValidationUtils.isRequired(null) ? 'entro a True' : 'entro a falso, null'}</p>
      <p>{ValidationUtils.isEmail('hola@mundo.com') ? 'Sí es un email válido' : 'No es un email válido'}</p>
      <p>{ValidationUtils.isEmail('hola@mundo') ? 'Sí es un email válido' : 'No es un email válido'}</p>
      <p>{ValidationUtils.minLength('hola mundo', 5) ? 'Sí cumple con la longitud mínima' : 'No cumple con la longitud mínima'}</p>
      <p>{ValidationUtils.maxLength('hola mundo', 5) ? 'Sí cumple con la longitud máxima' : 'No cumple con la longitud máxima'}</p>
      <p>{ValidationUtils.isPhone('(230) 555-1234', 'US') ? 'Sí es un número de teléfono válido' : 'No es un número de teléfono válido'}</p>
      <h1>Url utils</h1>
      <p>{UrlUtils.buildQuery({ name: 'John', age: 30, hobbies: ['reading', 'coding'] })}</p>
      <p>{JSON.stringify(UrlUtils.parseQuery('?name=John&age=30&hobbies=reading&hobbies=coding'))}</p>
      <p>{UrlUtils.join('https://example.com', '/api/v1/users')}</p>
      <p>{UrlUtils.join('', 'api/to/resource')}</p>
      <p>{UrlUtils.join('https://example.com', '')}</p>
      <p>{UrlUtils.withQuery('/users?page=1', { search: 'nelson', page: 2 })}</p>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);