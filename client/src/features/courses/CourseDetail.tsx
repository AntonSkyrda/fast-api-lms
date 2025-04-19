import { useCourse } from "./useCourse";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import CourseDataBox from "./CourseDataBox";
import { Button, buttonVariants } from "../../ui/Button";
import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import AddTeacherToCourse from "./AddTeacherToCourse";
import { useEffect } from "react";
import RemoveTeacherFromCourse from "./RemoveTeacherFromCourse";

function CourseDetail() {
  const { isLoading, course, courseError } = useCourse();

  useEffect(
    function () {
      if (courseError) toast.error(courseError.message);
    },
    [courseError],
  );

  if (isLoading) return <Spinner />;
  if (!course) return <Empty resourceName="Курс" />;

  return (
    <div className="flex flex-col gap-10 px-10 py-4">
      <header className="flex flex-col gap-10">
        <Heading as="h2">Деталі курсу</Heading>
        <div className="flex flex-row items-center justify-between">
          <NavLink
            to="/courses"
            className={buttonVariants({ variant: "default" }) + ""}
          >
            &larr; Назад
          </NavLink>
          <div className="flex flex-row items-center gap-5">
            <AddTeacherToCourse />
            <RemoveTeacherFromCourse />
            <UpdateCourse course={course} />
          </div>
        </div>
      </header>
      <CourseDataBox course={course} />

      <div className="flex flex-row justify-end gap-5">
        <DeleteCourse course={course} />
        <Button variant="outline">
          <span>
            <Plus />
          </span>
          Додати заннятя
        </Button>
      </div>
    </div>
  );
}

export default CourseDetail;
