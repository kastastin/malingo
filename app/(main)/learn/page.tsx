import { redirect } from "next/navigation";

import { getUserProgress, getUnits } from "@/db/queries";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { Unit } from "./unit";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

export default async function LearnPage() {
  const userProgressPromise = getUserProgress();
  const unitsPromise = getUnits();

  const [userProgress, units] = await Promise.all([
    userProgressPromise,
    unitsPromise,
  ]);

  // Redirect to courses page if user has no active course
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

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
              activeLesson={undefined}
              activeLessonPercentage={0}
              order={unit.order}
            />
          </div>
        ))}
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
}
