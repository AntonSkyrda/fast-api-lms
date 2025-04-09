import { z } from "zod";
import { courseDetailSchema } from "../../schemas/coursesSchema";
import Heading from "../../ui/Heading";

interface CourseDataBoxProps {
  course: z.infer<typeof courseDetailSchema>;
}

function CourseDataBox({ course }: CourseDataBoxProps) {
  return (
    <article className="bg-norway-100 border-norway-700 text-norway-950 overflow-hidden rounded-md border">
      <header className="bg-goldenrod-200 text-goldenrod-950 flex items-center justify-between px-16 py-8 text-3xl font-medium">
        <Heading as="h3">Курс {course.name}</Heading>
        <p>01.04.2025 &mdash; 31.05.202</p>
      </header>
      <section className="flex flex-col gap-5 px-16 pt-12 pb-5">
        <div className="grid grid-cols-[10rem_1fr] items-baseline">
          <Heading as="h4">Про курс:</Heading>
          <p>{course.description}</p>
        </div>
        {course.teacher?.id && (
          <div className="grid grid-cols-[10rem_1fr] items-baseline">
            <Heading as="h4">Викладач:</Heading>
            <p>
              {course.teacher.first_name} {course.teacher.last_name}
            </p>
          </div>
        )}
        {/* {course.groups[0]?.id && (
          <div className="grid grid-cols-[10rem_1fr] items-baseline">
            <Heading as="h4">Групи:</Heading>
            <ul className="flex flex-row gap-3">
              {course.groups?.map((group, index) => (
                <li key={group.id}>
                  {`${group.name}${index === course.groups.length - 1 ? "" : ","}`}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </section>
      <footer className="bg-norway-200 gap-5 px-16 py-7 text-right">
        Наступне заняття:
      </footer>
    </article>
  );
}

export default CourseDataBox;
