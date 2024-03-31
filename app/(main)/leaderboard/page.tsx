import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getUserProgress,
  getUserSubscription,
  getTopTenUsers,
} from "@/db/queries";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function LeaderboardPage() {
  const userProgressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();
  const topTenUsersPromise = getTopTenUsers();

  const [userProgress, topTenUsers, userSubscription] = await Promise.all([
    userProgressPromise,
    topTenUsersPromise,
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
            src="/menu-items/leaderboard.svg"
            width={90}
            height={90}
            alt="Leaderboard"
          />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Leaderboard
          </h1>

          <p className="mb-6 text-center text-lg text-muted-foreground">
            See where you stand among other learners in the community.
          </p>

          <Separator className="mb-4 h-0.5 rounded-full" />

          {topTenUsers.map((userProgress, index) => (
            <div
              key={userProgress.userId}
              className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
            >
              <p className="mr-4 font-bold text-lime-700">{index + 1}</p>
              <Avatar className="ml-3 mr-6 h-12 w-12 border bg-green-500">
                <AvatarImage
                  className="object-cover"
                  src={userProgress.userImageSrc}
                />
              </Avatar>
              <p className="flex-1 font-bold text-neutral-800">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">{userProgress.points} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          points={userProgress.points}
          hearts={userProgress.hearts}
          hasActiveSubscription={isPro}
        />
      </StickyWrapper>
    </div>
  );
}
