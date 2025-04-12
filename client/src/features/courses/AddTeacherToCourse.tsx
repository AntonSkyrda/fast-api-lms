import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTeachers } from "../users/useTeachers";
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
import Empty from "../../ui/Empty";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { addTeacherToCourseFormSchema } from "../../schemas/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCourse } from "./useCourse";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

function AddTeacherToCourse() {
  const { user } = useAuth();
  const { course } = useCourse();
  const { addTeacherToCourse, isPending } = useAddTeacherToCourse();
  const { teachers, isLoading: isLoadingTeachers } = useTeachers();
  const [isOpen, setIsOpen] = useState(false);

  const isLoading = isPending || isLoadingTeachers;

  const form = useForm<z.infer<typeof addTeacherToCourseFormSchema>>({
    resolver: zodResolver(addTeacherToCourseFormSchema),
    defaultValues: {
      teacherId: course?.teacher?.id,
    },
  });

  useEffect(
    function () {
      if (isOpen === false) return () => form.reset();
    },
    [isOpen, form],
  );

  function handleSubmit(data: FieldValues) {
    if (!course?.id) {
      toast.error("Неможливо отримати дані про курс");
      return setIsOpen(false);
    }
    addTeacherToCourse(data.teacherId);
    setIsOpen(false);
  }

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
          <DialogTitle>
            Додаавання викладача до курсу {course?.name}
          </DialogTitle>
          <DialogDescription className="mb-6">
            Додайте викладача для студентів.
          </DialogDescription>
        </DialogHeader>
        {teachers?.length === 0 ? (
          <Empty resourceName="Викладачів" />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                // control={form.control}
                name="teacherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Викладач</FormLabel>
                    <Select
                      // onValueChange={field.onChange}
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Оберіть викладача для цього курсу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teachers?.map((teacher) => (
                          <SelectItem
                            key={teacher.id}
                            value={String(teacher.id)}
                          >
                            {teacher.first_name} {teacher.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button variant="default" type="submit">
                  Додати викладача
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddTeacherToCourse;
