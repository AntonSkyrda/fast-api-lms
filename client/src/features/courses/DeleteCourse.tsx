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
import { Trash } from "lucide-react";
import { useAuth } from "../../contexts/Auth/useAuth";
import { buttonVariants } from "../../ui/Button";
import { z } from "zod";

import { useDeleteCourse } from "./useDeleteCourse";
import { coursePlainSchema } from "../../schemas/plainShemas";

function DeleteCourse({
  course,
}: {
  course: z.infer<typeof coursePlainSchema>;
}) {
  const { user } = useAuth();
  const { deleteCourse, isPending } = useDeleteCourse();
  if (!user?.is_superuser) return null;
  if (!course.id || typeof course.id === "undefined") return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "destructive" })}
      >
        <span>
          <Trash />
        </span>
        Видалити курс
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Ви точно хочете видалити курс {course.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ця дія невідворотня. Це повністю видалить цей курс.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Відмінити</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => deleteCourse(course.id!)}
            disabled={isPending}
          >
            Видалити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCourse;
