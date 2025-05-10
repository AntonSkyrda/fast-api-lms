import { useAuth } from "../../contexts/Auth/useAuth";
import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { useDeleteCourse } from "./useDeleteCourse";
import { CourseDetailed, CoursePlain } from "../../types/dataTypes";

function DeleteGroup({ course }: { course: CoursePlain | CourseDetailed }) {
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
