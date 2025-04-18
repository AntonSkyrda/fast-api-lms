import { useState } from "react";
import { buttonVariants } from "../../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";
import CurseForm from "./CurseForm";
import { Pencil } from "lucide-react";
import { z } from "zod";
import { coursePlainSchema } from "../../schemas/plainShemas";

function UpdateCourse({
  course,
}: {
  course: z.infer<typeof coursePlainSchema>;
}) {
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
