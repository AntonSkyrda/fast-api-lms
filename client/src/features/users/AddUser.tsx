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
import AddUserForm from "./AddUserForm";

function AddUser() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        Додати користувачв
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додавання нового користувача</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mb-6">
          Додайте нового студента, викладача чи адміністратора
        </DialogDescription>
        <AddUserForm handleClose={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default AddUser;
