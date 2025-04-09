import CoursesHeader from "../features/courses/CoursesHeader";
import CoursesList from "../features/courses/CoursesList";
import usePageTitle from "../hooks/usePageTitle";

function Courses() {
  usePageTitle("Курси");
  return (
    <div className="flex flex-col gap-10 px-10 py-4">
      <CoursesHeader />
      <CoursesList />
    </div>
  );
}

export default Courses;
