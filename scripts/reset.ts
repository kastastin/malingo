import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

// To run this script, use the following commands:
// tsx ./scripts/seed.ts OR npm run db:seed

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

// Seed the database
const main = async () => {
  try {
    console.log("Resetting database...");

    // Delete all records from tables
    await db.delete(schema.courses);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);

    console.log("Database reset successfully.");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset database.");
  }
};

main();
