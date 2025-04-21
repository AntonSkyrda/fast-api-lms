import { z } from "zod";
import Heading from "../../ui/Heading";
import { courseDetailedSchema } from "../../schemas/coursesSchema";
import { useAuth } from "../../contexts/Auth/useAuth";
import CourseGroups from "./CourseGroups";

interface CourseDataBoxProps {
  course: z.infer<typeof courseDetailedSchema>;
}

function CourseTeacher({ course }: CourseDataBoxProps) {
  const { user } = useAuth();
  if (typeof course.teacher === "object" && !course.teacher?.id)
    return <span>У курса ще немає викладача...</span>;
  if (user?.id === course.teacher?.id) return <p>Ваш курс</p>;
  return (
    <div className="flex flex-row items-baseline gap-8">
      <Heading as="h4">Викладач:</Heading>
      <span>
        {course?.teacher?.first_name} {course?.teacher?.last_name}
      </span>
    </div>
  );
}

function CourseDataBox({ course }: CourseDataBoxProps) {
  return (
    <article className="border-goldenrod-200 text-goldenrod-950 space-y-16 overflow-hidden rounded-md border-2 text-base shadow-md">
      <header className="flex items-center justify-between px-16 py-8 font-medium">
        <div className="flex flex-row items-baseline gap-8">
          <Heading as="h4">Курс:</Heading>
          <p>{course.name}</p>
        </div>
        <CourseTeacher course={course} />
      </header>
      <section className="flex flex-col gap-12 px-16 pt-12 pb-5">
        <div className="flex flex-row items-baseline gap-8">
          <Heading as="h4">Про курс:</Heading>
          <p>{course.description}</p>
        </div>

        <CourseGroups groups={course.groups} />

        <div className="flex flex-row items-baseline gap-8">
          <Heading as="h4">Програма:</Heading>
        </div>
      </section>
      <footer className="bg-goldenrod-200 gap-5 px-16 py-7 text-right"></footer>
    </article>
  );
}

export default CourseDataBox;
