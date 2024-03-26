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
    console.log("Seeding database...");

    // Delete all records from the courses, userProgress tables
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/flags/es.svg",
      },
      {
        id: 2,
        title: "Italian",
        imageSrc: "/flags/it.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/flags/fr.svg",
      },
      {
        id: 4,
        title: "Croatian",
        imageSrc: "/flags/hr.svg",
      },
    ]);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database.");
  }
};

main();
