import { Calendar } from "lucide-react";
import { Button } from "../../ui/button";
import { z } from "zod";
import AdminCourseCardActions from "./AdminCourseCardActions";
import { coursePlainSchema } from "../../schemas/plainShemas";

function CourseCardActions({
  course,
}: {
  course: z.infer<typeof coursePlainSchema>;
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
