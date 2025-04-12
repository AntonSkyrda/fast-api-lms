import { useAuth } from "../../contexts/AuthContext";
import { useCourse } from "./useCourse";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
} from "../../ui/AlertDialog";
import { buttonVariants } from "../../ui/Button";
import { Minus } from "lucide-react";
import { useRemoveTeacherFromCourse } from "./useRemoveTeacherFromCourse";
import { useEffect } from "react";
import toast from "react-hot-toast";

function RemoveTeacherFromCourse() {
  const { user } = useAuth();
  const { course } = useCourse();
  const { removeTeacherFromCourse, removeTeacherFromCourseError, isPending } =
    useRemoveTeacherFromCourse();

  useEffect(
    function () {
      if (removeTeacherFromCourseError)
        toast.error(removeTeacherFromCourseError.message);
    },
    [removeTeacherFromCourseError],
  );

  const shouldShowRemoveButton =
    user?.is_superuser === true && Boolean(course?.teacher?.id);

  if (!user || !course) return null;
  if (!shouldShowRemoveButton) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "destructive" })}
      >
        <span>
          <Minus />
        </span>
        Зняти викладача
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Ви точно хочете зняти викладача {course?.teacher?.first_name}{" "}
            {course?.teacher?.last_name} з курсу {course?.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>Ця дія невідворотня.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Відмінити</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={isPending}
            onClick={() => removeTeacherFromCourse()}
          >
            Видалити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveTeacherFromCourse;
