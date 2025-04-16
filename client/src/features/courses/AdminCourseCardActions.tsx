import { z } from "zod";
import { useAuth } from "../../contexts/Auth/useAuth";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import { coursePlainSchema } from "../../schemas/plainShemas";

function AdminCourseCardActions({
  course,
}: {
  course: z.infer<typeof coursePlainSchema>;
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
