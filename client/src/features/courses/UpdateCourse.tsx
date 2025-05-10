import { useState } from "react";
import { buttonVariants } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import CurseForm from "./CurseForm";
import { Pencil } from "lucide-react";
import { CoursePlain } from "../../types/dataTypes";

function UpdateCourse({ course }: { course: CoursePlain }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        <span>
          <Pencil />
        </span>
        Редагувати курс
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редагування курсу {course.name}</DialogTitle>
          <DialogDescription className="mb-6">
            Оновіть дані про курс.
          </DialogDescription>
        </DialogHeader>
        <CurseForm
          isOpen={isOpen}
          handleClose={setIsOpen}
          courseToEdit={course}
        />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCourse;
