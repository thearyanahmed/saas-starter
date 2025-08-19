import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

let client: postgres.Sql | null = null;
let db: ReturnType<typeof drizzle> | null = null;

function getDatabase() {
  if (!process.env.POSTGRES_URL) {
    throw new Error(
      'POSTGRES_URL environment variable is not set. Please set it to use database features.'
    );
  }

  if (!client) {
    client = postgres(process.env.POSTGRES_URL);
    db = drizzle(client, { schema });
  }

  return db!;
}

export { getDatabase as db };
