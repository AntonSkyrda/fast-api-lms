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

function CourseDetail() {
  const { isLoading, course, courseError } = useCourse();

  if (isLoading) return <Spinner />;
  if (courseError) toast.error(courseError.message);
  if (!course) return <Empty resourceName="Курс" />;

  return (
    <div className="flex flex-col gap-10 px-10 py-4">
      <header className="grid grid-cols-[auto_1fr] grid-rows-2 gap-5">
        <Heading as="h2">Деталі курсу</Heading>
        <NavLink
          to="/courses"
          className={
            buttonVariants({ variant: "default" }) + " row-start-2 w-1/2"
          }
        >
          &larr; Назад
        </NavLink>
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
        <UpdateCourse course={course} />
      </div>
    </div>
  );
}

export default CourseDetail;
