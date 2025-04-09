import { Calendar } from "lucide-react";
import { Button } from "../../ui/Button";
import UpdateCourse from "./UpdateCourse";
import { z } from "zod";
import { courseSimpleSchema } from "../../schemas/coursesSchema";
import DeleteCourse from "./DeleteCourse";

function CourseCardActions({
  course,
}: {
  course: z.infer<typeof courseSimpleSchema>;
}) {
  return (
    <div className="flex flex-col gap-5">
      <UpdateCourse course={course} />
      <Button variant="outline">
        <span>
          <Calendar />
        </span>
        Розклад
      </Button>
      <DeleteCourse course={course} />
    </div>
  );
}

export default CourseCardActions;
