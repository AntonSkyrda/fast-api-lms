import { useAuth } from "../../contexts/Auth/useAuth";
import { useAddTeacherToCourse } from "./useAddTeacherToCourse";
import { Button, buttonVariants } from "../../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";
import { useCourse } from "./useCourse";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Search from "../../ui/Search";
import { useSearchTeachers } from "../users/useSearchTeachers";
import SearchResults from "../../ui/SearchResults";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils/cn";
import { useQueryClient } from "@tanstack/react-query";

function AddTeacherToCourse() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { course } = useCourse();
  const { addTeacherToCourse, isPending } = useAddTeacherToCourse();
  const [isOpen, setIsOpen] = useState(false);

  const [searchStr, setSearchStr] = useState("");
  const teachersData = useSearchTeachers(searchStr);

  const isLoading = isPending || teachersData.isLoading;

  function clear() {
    queryClient.removeQueries({ queryKey: ["teachers"] });
    setSearchStr("");
  }

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
        <div className="space-y-8">
          <Search
            searchStr={searchStr}
            onSearchChange={setSearchStr}
            isLoading={isLoading}
          />
          <SearchResults
            searchStr={searchStr}
            isLoading={isLoading}
            resultsLength={teachersData.teachers?.length}
            recourseName="Викладачів"
          >
            {teachersData.teachers?.map((teacher) => (
              <li
                key={teacher.id}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "flex flex-row items-center justify-between py-4",
                )}
              >
                <p>
                  {teacher.last_name} {teacher.first_name} {teacher.father_name}
                </p>
                <Button
                  onClick={() => handleSubmit(teacher.id)}
                  disabled={isLoading}
                  variant="secondary"
                >
                  Додати
                </Button>
              </li>
            ))}
          </SearchResults>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddTeacherToCourse;
