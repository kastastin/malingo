import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // <- serial means auto-incrementing integer
  title: text("title").notNull(), // <- notNull means required
  imageSrc: text("image_src").notNull(), // <- snake_case saved in db (recommended)
});
