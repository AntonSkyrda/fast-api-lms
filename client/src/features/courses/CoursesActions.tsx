import { Button, buttonVariants } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

function CoursesActions() {
  return (
    <div className="flex flex-row gap-5">
      <Button variant="outline">Сортувати</Button>
      <Dialog>
        <DialogTrigger className={buttonVariants({ variant: "default" })}>
          Створити новий курс
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Створення нового курсу</DialogTitle>
            <DialogDescription>
              Створіть курс для своїх студентів
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CoursesActions;
