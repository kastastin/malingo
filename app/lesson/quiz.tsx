"use client";

import { useState } from "react";

import { challenges, challengeOptions } from "@/db/schema";

import { Header } from "./header";
import { Challenge } from "./challenge";
import { QuestionBubble } from "./question-bubble";
import { Footer } from "./footer";

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

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const currentChallenge = challenges[activeIndex];
  const options = currentChallenge?.challengeOptions ?? [];

  function onSelect(id: number) {
    if (status !== "none") return;

    setSelectedOption(id);
  }

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
                selectedOption={selectedOption}
                type={currentChallenge.type}
                status={status}
                disabled={false}
                onSelect={onSelect}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer status={status} disabled={!selectedOption} onCheck={() => {}} />
    </>
  );
}
