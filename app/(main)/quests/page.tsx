import Image from "next/image";
import { redirect } from "next/navigation";

import { quests } from "@/constants";
import { getUserProgress, getUserSubscription } from "@/db/queries";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/promo";

export default async function QuestsPage() {
  const userProgressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressPromise,
    userSubscriptionPromise,
  ]);

  // Redirect to courses page if user has no active course
  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/menu-items/quests.svg"
            width={90}
            height={90}
            alt="Quests"
          />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Quests
          </h1>

          <p className="mb-6 text-center text-lg text-muted-foreground">
            Complete quests by earning points.
          </p>

          {/* List of quests */}
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  key={quest.title}
                  className="flex w-full items-center gap-x-4 border-t-2 p-4"
                >
                  <Image
                    src="/points.svg"
                    width={60}
                    height={60}
                    alt="Points"
                  />
                  <div className="flex w-full flex-col gap-y-2">
                    <p className="text-xl font-bold text-neutral-700">
                      {quest.title}
                    </p>

                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          points={userProgress.points}
          hearts={userProgress.hearts}
          hasActiveSubscription={isPro}
        />

        {!isPro && <Promo />}
      </StickyWrapper>
    </div>
  );
}
