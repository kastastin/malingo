import { redirect } from "next/navigation";

import { getUserProgress } from "@/db/queries";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

export default async function LearnPage() {
  const userProgressPromise = getUserProgress();

  const [userProgress] = await Promise.all([userProgressPromise]);

  // Redirect to courses page if user has no active course
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Spanish", imageSrc: "/flags/es.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
}
