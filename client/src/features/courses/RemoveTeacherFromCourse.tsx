import { useAuth } from "../../contexts/Auth/useAuth";
import { useCourse } from "./useCourse";
import { useRemoveTeacherFromCourse } from "./useRemoveTeacherFromCourse";
import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { Minus } from "lucide-react";

function RemoveTeacherFromCourse() {
  const { user } = useAuth();
  const { course } = useCourse();
  const { removeTeacherFromCourse, isPending } = useRemoveTeacherFromCourse();

  const shouldShowRemoveButton =
    user?.is_superuser === true && Boolean(course?.teacher?.id);

  if (!user || !course) return null;
  if (!shouldShowRemoveButton) return null;

  return (
    <DeleteRecourceButton
      tiggerTitle="Видалити викладача"
      title={`Ви точно хочете вилалити викладача ${course.teacher?.first_name} ${course.teacher?.last_name} з курсу ${course.name}?`}
      onDelete={() => removeTeacherFromCourse({})}
      isLoading={isPending}
      Icon={<Minus />}
    />
  );
}

export default RemoveTeacherFromCourse;
