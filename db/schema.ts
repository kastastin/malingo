import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // <- serial means auto-incrementing integer
  title: text("title").notNull(), // <- notNull means required
  imageSrc: text("image_src").notNull(), // <- snake_case saved in db (recommended)
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
}));

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/maskot.svg"),
  points: integer("points").notNull().default(0),
  hearts: integer("hearts").notNull().default(5),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));
