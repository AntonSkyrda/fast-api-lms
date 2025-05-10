import CoursesActions from "../features/courses/CoursesActions";
import CoursesList from "../features/courses/CoursesList";
import { useCourses } from "../features/courses/useCourses";
import PageHeader from "../ui/PageHeader";
import PaginationComponent from "../ui/PaginationComponent";

function Courses() {
  const { totalCourses } = useCourses();

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-10 px-10 py-4">
      <PageHeader title="Курси">
        <CoursesActions />
      </PageHeader>
      <CoursesList />
      <PaginationComponent total={totalCourses!} />
    </div>
  );
}

export default Courses;
