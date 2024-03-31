import Image from "next/image";
import { redirect } from "next/navigation";

import { getUserProgress } from "@/db/queries";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

import { Items } from "./items";

export default async function ShopPage() {
  const userProgressPromise = getUserProgress();

  const [userProgress] = await Promise.all([userProgressPromise]);

  // Redirect to courses page if user has no active course
  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/menu-items/shop.svg" width={90} height={90} alt="Shop" />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Shop
          </h1>

          <p className="mb-6 text-center text-lg text-muted-foreground">
            Spend your points on cool stuff.
          </p>

          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={false}
          />
        </div>
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          points={userProgress.points}
          hearts={userProgress.hearts}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
}
