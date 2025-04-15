import CoursesHeader from "../features/courses/CoursesHeader";
import CoursesList from "../features/courses/CoursesList";
import { useCourses } from "../features/courses/useCourses";
import usePageTitle from "../hooks/usePageTitle";
import PaginationComponent from "../ui/PaginationComponent";

function Courses() {
  const { totalCourses } = useCourses();
  usePageTitle("Курси");
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-10 px-10 py-4">
      <CoursesHeader />
      <CoursesList />
      <PaginationComponent total={totalCourses!} />
    </div>
  );
}

export default Courses;
