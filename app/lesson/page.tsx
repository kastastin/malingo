import { redirect } from "next/navigation";

import { getLesson, getUserProgress } from "@/db/queries";

import { Quiz } from "./quiz";

export default async function LessonPage() {
  const lessonPromise = getLesson();
  const userProgressPromise = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonPromise,
    userProgressPromise,
  ]);

  // Redirect to the learn page if the lesson or user progress is not found
  if (!lesson || !userProgress) redirect("/learn");

  // Formula: (completed challenges / total challenges) * 100
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
      initialLessonChallenges={lesson.challenges}
    />
  );
}

