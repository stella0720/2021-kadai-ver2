import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'sls-coffee',
  apiKey: process.env.API_KEY,
});