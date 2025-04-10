import { z } from "zod";
import { useAuth } from "../../contexts/AuthContext";
import UpdateCourse from "./UpdateCourse";
import { courseSimpleSchema } from "../../schemas/coursesSchema";
import DeleteCourse from "./DeleteCourse";

function AdminCourseCardActions({
  course,
}: {
  course: z.infer<typeof courseSimpleSchema>;
}) {
  const { user } = useAuth();
  if (!user?.is_superuser) return null;

  return (
    <>
      <UpdateCourse course={course} />
      <DeleteCourse course={course} />
    </>
  );
}

export default AdminCourseCardActions;
