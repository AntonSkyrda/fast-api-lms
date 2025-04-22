import React, {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { buttonVariants } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface AddRecourceButtonProps {
  triggerTitle?: string;
  title?: string;
  description?: string;
  children: ReactNode;
}

interface DialogControlProps {
  isOpen: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddRecourceButton({
  triggerTitle = "Додати новий ресурс",
  title = "Додавання нового ресурсу",
  description = "У цьому вікні ви можете створити новий ресурс",
  children,
}: AddRecourceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<DialogControlProps>, {
        isOpen,
        handleClose: setIsOpen,
      });
    }
    return child;
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        {triggerTitle}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mb-6">{description}</DialogDescription>
        </DialogHeader>
        {childrenWithProps}
      </DialogContent>
    </Dialog>
  );
}

export default AddRecourceButton;
