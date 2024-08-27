import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL!
});

(async function () {
  await client.connect();
})();

export const db = drizzle(client);
