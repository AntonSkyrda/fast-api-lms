import { useCourses } from "./useCourses";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import CourseCard from "./CourseCard";
import toast from "react-hot-toast";

function CoursesList() {
  const { isLoading, courses, coursesError } = useCourses();

  if (isLoading) return <Spinner />;
  if (coursesError) return toast.error(coursesError.message);
  if (!courses?.length) return <Empty resourceName="Курси" />;
  return (
    <ul className="grid grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ul>
  );
}

export default CoursesList;
