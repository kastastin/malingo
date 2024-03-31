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

    // Delete all records from tables
    await db.delete(schema.courses);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);

    // <-- Courses -->
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

    // <-- Units -->
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    // <-- Lessons -->
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: "Nouns",
        order: 1,
      },
      {
        id: 2,
        unitId: 1,
        title: "Verbs",
        order: 2,
      },
      {
        id: 3,
        unitId: 1,
        title: "New Verbs",
        order: 3,
      },
      {
        id: 4,
        unitId: 1,
        title: "Mixed Verbs",
        order: 4,
      },
      {
        id: 5,
        unitId: 1,
        title: "Additional Nouns",
        order: 5,
      },
    ]);

    // <-- Challenges -->
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        question: 'Which one of these is the "the man"?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        question: '"the man"',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        question: 'Which one of these is the "the robot"?',
        order: 3,
      },
    ]);

    // <-- challengeOptions for id: 1 -->
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        correct: true,
        text: "el hombre",
        imageSrc: "/man.svg",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        correct: false,
        text: "la mujer",
        imageSrc: "/woman.svg",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1,
        correct: false,
        text: "el robot",
        imageSrc: "/robot.svg",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    // <-- challengeOptions for id: 2 -->
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    // <-- challengeOptions for id: 3 -->
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        correct: false,
        text: "el hombre",
        imageSrc: "/man.svg",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        correct: false,
        text: "la mujer",
        imageSrc: "/woman.svg",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3,
        correct: true,
        text: "el robot",
        imageSrc: "/robot.svg",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    // <-- Challenges -->
    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 5,
        lessonId: 2,
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 6,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
    ]);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database.");
  }
};

main();
