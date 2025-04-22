import { Calendar } from "lucide-react";
import { Button } from "../../ui/button";
import { z } from "zod";
import { coursePlainSchema } from "../../schemas/plainShemas";
import { useAuth } from "../../contexts/Auth/useAuth";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

function CourseCardActions({
  course,
}: {
  course: z.infer<typeof coursePlainSchema>;
}) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-5">
      {user?.is_superuser && (
        <>
          <UpdateCourse course={course} />
          <DeleteCourse course={course} />
        </>
      )}
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
