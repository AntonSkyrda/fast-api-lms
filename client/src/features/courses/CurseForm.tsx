import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { z } from "zod";
import {
  courseDetailSchema,
  courseSimpleSchema,
} from "../../schemas/coursesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useAddCourse } from "./useAddCourse";
import Spinner from "../../ui/Spinner";
import { useUpdateCourse } from "./useUpdateCourse";

interface CourseFormProps {
  handleClose: (isOpen: boolean) => void;
  courseToEdit?:
    | z.infer<typeof courseSimpleSchema>
    | z.infer<typeof courseDetailSchema>;
}
function CurseForm({ handleClose, courseToEdit }: CourseFormProps) {
  const { id: editId, ...editValues } = courseToEdit ?? {};

  const isEditSession = Boolean(editId);

  const { addCourse, isPending: isAdding } = useAddCourse();
  const { updateCourse, isPending: isUpdating } = useUpdateCourse();

  const isLoading = isAdding || isUpdating;

  const form = useForm<z.infer<typeof courseSimpleSchema>>({
    resolver: zodResolver(courseSimpleSchema),
    defaultValues: isEditSession
      ? editValues
      : {
          name: "",
          description: "",
        },
  });

  function onSubmit(data: FieldValues) {
    const { success, data: courseData } = courseSimpleSchema.safeParse(data);
    if (!success) return;
    if (isEditSession && typeof editId === "number")
      updateCourse(
        { data: { ...courseData }, id: editId },
        {
          onSuccess: () => {
            form.reset();
            handleClose(false);
          },
        },
      );
    else {
      addCourse(courseData);
      form.reset();
      handleClose(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-8">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Назва курсу</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Опис курсу</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="description"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <div>
          <Button variant="default" type="submit" disabled={isLoading}>
            <span>
              {isLoading ? (
                <Spinner />
              ) : isEditSession ? (
                "Редагувати"
              ) : (
                "Створити"
              )}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CurseForm;
