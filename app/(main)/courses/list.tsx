"use client";

import { courses } from "@/db/schema";

import { Card } from "./card";

type Props = {
  courses: (typeof courses.$inferInsert)[];
  activeCourseId: number;
};

export function List({ courses, activeCourseId }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id || 1}
          title={course.title}
          imageSrc={course.imageSrc}
          active={course.id === activeCourseId}
          disabled={false}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}
