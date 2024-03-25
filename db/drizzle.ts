import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

// More information: https://orm.drizzle.team/docs/rqb

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema }); // <- Drizzle instance

export default db;
