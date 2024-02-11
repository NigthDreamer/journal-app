/* eslint-disable no-undef */
import 'whatwg-fetch';
import 'setimmediate';

//* Saco las variables de entorno de testing
require('dotenv').config({
  path: '.env.test'
});

//* Hago el mock de las variables de entorno usando el helper
jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env })
}));