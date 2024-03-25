import "dotenv/config";
import type { Config } from "drizzle-kit";

// More information: https://orm.drizzle.team/kit-docs/config-reference

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
