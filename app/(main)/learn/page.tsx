import { redirect } from "next/navigation";

import { lessons, units as unitsSchema } from "@/db/schema";

import {
  getUserProgress,
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserSubscription,
} from "@/db/queries";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { Unit } from "./unit";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

export default async function LearnPage() {
  const userProgressPromise = getUserProgress();
  const courseProgressPromise = getCourseProgress();
  const lessonPercentagePromise = getLessonPercentage();
  const unitsPromise = getUnits();
  const userSubscriptionPromise = getUserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgressPromise,
    unitsPromise,
    courseProgressPromise,
    lessonPercentagePromise,
    userSubscriptionPromise,
  ]);

  // Redirect to courses page if user has no active course
  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  // Redirect to courses page if user has no course progress
  if (!courseProgress) redirect("/courses");

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />

        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLessonPercentage={lessonPercentage}
              order={unit.order}
              activeLesson={
                courseProgress.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect;
                    })
                  | undefined
              }
            />
          </div>
        ))}
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
      </StickyWrapper>
    </div>
  );
}
