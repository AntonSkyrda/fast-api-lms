import { Calendar } from "lucide-react";
import { Button } from "../../ui/Button";
import { z } from "zod";
import { courseSimpleSchema } from "../../schemas/coursesSchema";
import AdminCourseCardActions from "./AdminCourseCardActions";

function CourseCardActions({
  course,
}: {
  course: z.infer<typeof courseSimpleSchema>;
}) {
  return (
    <div className="flex flex-col gap-5">
      <AdminCourseCardActions course={course} />
      <Button variant="outline">
        <span>
          <Calendar />
        </span>
        Розклад
      </Button>
    </div>
  );
}

export default CourseCardActions;
