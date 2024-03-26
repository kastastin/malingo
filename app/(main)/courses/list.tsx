"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";

import { Card } from "./card";

type Props = {
  courses: (typeof courses.$inferInsert)[];
  activeCourseId?: typeof userProgress.$inferInsert.activeCourseId;
};

export function List({ courses, activeCourseId }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const clickHandler = (id: number) => {
    // Prevent multiple transitions
    if (pending) return;

    // Start a transition to the learn page
    if (id === activeCourseId) return router.push("/learn");

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id || 1}
          title={course.title}
          imageSrc={course.imageSrc}
          active={course.id === activeCourseId}
          disabled={pending}
          onClick={clickHandler}
        />
      ))}
    </div>
  );
}
