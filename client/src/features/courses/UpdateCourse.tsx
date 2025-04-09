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
import { useAuth } from "../../contexts/AuthContext";
import { Pencil } from "lucide-react";
import { z } from "zod";
import {
  courseDetailSchema,
  courseSimpleSchema,
} from "../../schemas/coursesSchema";

function UpdateCourse({
  course,
}: {
  course:
    | z.infer<typeof courseSimpleSchema>
    | z.infer<typeof courseDetailSchema>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  if (!user?.is_superuser) return null;

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
        <CurseForm handleClose={setIsOpen} courseToEdit={course} />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCourse;
