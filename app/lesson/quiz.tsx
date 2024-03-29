"use client";

import { useState } from "react";

import { challenges, challengeOptions } from "@/db/schema";

import { Header } from "./header";
import { Challenge } from "./challenge";
import { QuestionBubble } from "./question-bubble";

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

  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge?.challengeOptions ?? [];

  const title =
    currentChallenge.type === "ASSIST"
      ? "Select the correct answer"
      : currentChallenge.question;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
              {title}
            </h1>

            <div>
              {currentChallenge.type === "ASSIST" && (
                <QuestionBubble question={currentChallenge.question} />
              )}

              <Challenge
                options={options}
                selectedOption={undefined}
                type={currentChallenge.type}
                status="none"
                disabled={false}
                onSelect={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
