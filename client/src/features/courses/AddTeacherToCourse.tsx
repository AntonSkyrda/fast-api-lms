import { useAuth } from "../../contexts/Auth/useAuth";
import { useAddTeacherToCourse } from "./useAddTeacherToCourse";
import { buttonVariants } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useCourse } from "./useCourse";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import TeachersSearch from "../users/TeachersSearch";

function AddTeacherToCourse() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { course } = useCourse();
  const [isOpen, setIsOpen] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const { addTeacherToCourse, isPending } = useAddTeacherToCourse();

  const clear = useCallback(
    function () {
      queryClient.removeQueries({ queryKey: ["teachers"] });
      setSearchStr("");
    },
    [queryClient],
  );

  function handleSubmit(teacherId: number) {
    if (!course?.id) {
      toast.error("Неможливо отримати дані про курс");
      return setIsOpen(false);
    }

    if (typeof teacherId !== "number") return;

    addTeacherToCourse(teacherId);
    clear();
    setIsOpen(false);
  }

  useEffect(
    function () {
      if (!isOpen) clear();
    },
    [clear, isOpen],
  );

  if (!user?.is_superuser || course?.teacher?.id) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        <span>
          <Plus />
        </span>
        Додати викладача
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додавання викладача до курсу {course?.name}</DialogTitle>
          <DialogDescription className="mb-6">
            Додайте викладача для студентів.
          </DialogDescription>
        </DialogHeader>
        <TeachersSearch
          searchStr={searchStr}
          handleSearch={setSearchStr}
          handleSubmit={handleSubmit}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddTeacherToCourse;
