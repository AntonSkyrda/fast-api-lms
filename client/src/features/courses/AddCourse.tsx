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
import { useAuth } from "../../contexts/Auth/useAuth";

function AddCourse() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  if (!user?.is_superuser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        Створити новий курс
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Створення нового курсу</DialogTitle>
          <DialogDescription className="mb-6">
            Створіть курс для своїх студентів
          </DialogDescription>
        </DialogHeader>
        <CurseForm isOpen={isOpen} handleClose={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default AddCourse;
