import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { z } from "zod";
import { courseFormSchema } from "../../schemas/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/Button";
import { useAddCourse } from "./useAddCourse";
import Spinner from "../../ui/Spinner";
import { useUpdateCourse } from "./useUpdateCourse";
import { useEffect } from "react";
import { coursePlainSchema } from "../../schemas/plainShemas";

interface CourseFormProps {
  isOpen: boolean;
  handleClose: (isOpen: boolean) => void;
  courseToEdit?: z.infer<typeof coursePlainSchema>;
}
function CurseForm({ isOpen, handleClose, courseToEdit }: CourseFormProps) {
  const { id: editId, ...editValues } = courseToEdit ?? {};

  const isEditSession = Boolean(editId);

  const { addCourse, isPending: isAdding } = useAddCourse();
  const { updateCourse, isPending: isUpdating } = useUpdateCourse();

  const isLoading = isAdding || isUpdating;

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: isEditSession ? editValues : { name: "", description: "" },
  });

  useEffect(
    function () {
      if (isOpen === false) return () => form.reset();
    },
    [isOpen, form],
  );

  // useEffect(
  //   function () {
  //     console.log(form.formState.errors);
  //   },
  //   [handleClose, form.formState],
  // );

  function onSubmit(data: FieldValues) {
    const { success, data: courseData } = courseFormSchema.safeParse(data);
    if (!success) return;

    if (isEditSession && typeof editId === "number") {
      const changedData: Partial<typeof courseData> = {};

      for (const key in courseData) {
        if (
          courseData[key as keyof typeof courseData] !==
          editValues[key as keyof typeof editValues]
        ) {
          changedData[key as keyof typeof courseData] =
            courseData[key as keyof typeof courseData];
        }
      }

      console.log(changedData);

      if (Object.keys(changedData).length === 0) return;

      updateCourse(
        { data: { ...changedData }, id: editId },
        {
          onSuccess: () => {
            form.reset();
            handleClose(false);
          },
        },
      );
    } else {
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

        <div className="flex flex-row gap-5">
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
          <Button
            variant="outline"
            type="reset"
            disabled={isLoading}
            onClick={() => form.reset()}
          >
            <span>Скинути</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CurseForm;
