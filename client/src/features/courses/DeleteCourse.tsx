import { z } from "zod";
import { useAuth } from "../../contexts/Auth/useAuth";
import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { useDeleteCourse } from "./useDeleteCourse";
import { courseDetailedSchema } from "../../schemas/coursesSchema";
import { coursePlainSchema } from "../../schemas/plainShemas";

function DeleteGroup({
  course,
}: {
  course:
    | z.infer<typeof courseDetailedSchema>
    | z.infer<typeof coursePlainSchema>;
}) {
  const { deleteCourse, isPending } = useDeleteCourse();
  const { user } = useAuth();

  if (!user?.is_superuser) return null;

  return (
    <DeleteRecourceButton
      tiggerTitle="Видалити курс"
      title={`Ви точно хочете видалити курс ${course.name}`}
      onDelete={() => deleteCourse(course.id)}
      isLoading={isPending}
    />
  );
}

export default DeleteGroup;
