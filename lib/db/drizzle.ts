import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

let client: postgres.Sql | null = null;
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDatabase(): ReturnType<typeof drizzle<typeof schema>> | null {
  if (!process.env.POSTGRES_URL) {
    console.warn('POSTGRES_URL not set - database features will be disabled');
    return null;
  }

  if (!client) {
    client = postgres(process.env.POSTGRES_URL);
    db = drizzle(client, { schema });
  }

  return db!;
}

export { getDatabase as db };

