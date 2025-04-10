import { useCourses } from "./useCourses";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import CourseCard from "./CourseCard";
import toast from "react-hot-toast";
import { useEffect } from "react";

function CoursesList() {
  const { isLoading, courses, coursesError } = useCourses();

  useEffect(
    function () {
      if (coursesError) toast.error(coursesError.message);
    },
    [coursesError],
  );

  if (isLoading) return <Spinner />;
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
