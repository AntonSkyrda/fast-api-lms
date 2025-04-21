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
import { useAuth } from "../../contexts/Auth/useAuth";
import GroupForm from "./GroupForm";

function AddGroup() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  if (!user?.is_superuser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        Створити нову групу
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Створення нової груп</DialogTitle>
          <DialogDescription className="mb-6">
            Створіть групу для своїх студентів
          </DialogDescription>
        </DialogHeader>
        <GroupForm isOpen={isOpen} handleClose={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default AddGroup;
