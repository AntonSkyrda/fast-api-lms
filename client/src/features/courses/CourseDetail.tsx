import { useCourse } from "./useCourse";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import CourseDataBox from "./CourseDataBox";
import { Button, buttonVariants } from "../../ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

function CourseDetail() {
  const { isLoading, course, error } = useCourse();

  if (isLoading) return <Spinner />;
  if (error || !course) return <Empty resourceName="Курс" />;
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
        <Button variant="destructive">
          <span>
            <Trash />
          </span>
          Видалити
        </Button>
        <Button variant="outline">
          <span>
            <Plus />
          </span>
          Додати заннятя
        </Button>
        <Button variant="outline">
          <span>
            <Pencil />
          </span>
          Редагувати
        </Button>
      </div>
    </div>
  );
}

export default CourseDetail;
