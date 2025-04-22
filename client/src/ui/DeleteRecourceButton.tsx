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
} from "./alertDialog";
import { Trash } from "lucide-react";
import { buttonVariants } from "./button";
import { ReactNode } from "react";

interface DeleteRecourceButtonProps<T> {
  tiggerTitle?: string;
  title?: string;
  description?: string;
  isLoading?: boolean;
  Icon?: ReactNode;
  onDelete: () => void | T;
}

function DeleteRecourceButton<T>({
  tiggerTitle = "Видалити ресурс",
  title = "Ви точно хочете видалити цей ресурс? ",
  description = " Ця дія невідворотня.",
  isLoading = false,
  Icon = <Trash />,
  onDelete,
}: DeleteRecourceButtonProps<T>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "destructive" })}
      >
        <span>{Icon}</span>
        {tiggerTitle}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Відмінити</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => onDelete()}
            disabled={isLoading}
          >
            Видалити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteRecourceButton;
