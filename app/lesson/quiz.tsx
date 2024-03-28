"use client";

import { useState } from "react";

import { challenges, challengeOptions } from "@/db/schema";

import { Header } from "./header";

type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  userSubscription: any; // TODO: Define the user subscription type
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
};

export function Quiz({
  initialLessonId,
  initialHearts,
  initialPercentage,
  userSubscription,
  initialLessonChallenges,
}: Props) {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(50 || initialPercentage);
  
  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  );
}
