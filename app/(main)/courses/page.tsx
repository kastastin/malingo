import { getCourses, getUserProgress } from "@/db/queries";

import { List } from "./list";

export default async function CoursesPage() {
  const coursesPromise = getCourses();
  const userProgressPromise = getUserProgress();

  // Wait for both promises to resolve before rendering the page
  const [courses, userProgress] = await Promise.all([
    coursesPromise,
    userProgressPromise,
  ]);

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>

      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
}
