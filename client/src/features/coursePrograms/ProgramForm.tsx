import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { CourseDetailed, Program } from "../../types/dataTypes";
import { useAddProgram } from "./useAddProgram";
import { z } from "zod";
import { programFormSchema } from "../../schemas/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { getChangedFields } from "../../lib/utils/getChangedFields";
import { Button } from "../../ui/button";
import SpinnerMini from "../../ui/SpinnerMini";

interface ProgramFormProps {
  programToEdit?: Program;
  course: CourseDetailed;
}

function ProgramForm({ programToEdit, course }: ProgramFormProps) {
  const isEditSession = Boolean(programToEdit?.id);
  let defaultValues: z.infer<typeof programFormSchema>;

  const lastProgram =
    Array.isArray(course?.programs) && course.programs.length > 0
      ? course.programs[course.programs.length - 1]
      : null;

  if (isEditSession && programToEdit) {
    const { ...editValues } = programToEdit;
    defaultValues = { ...editValues, order: editValues.order + 1 };
  } else {
    defaultValues = {
      title: "",
      count_hours: 0,
      order: lastProgram ? lastProgram.order + 1 : 1,
      course_id: course.id,
    };
  }

  const { addProgram, isPending: isAdding } = useAddProgram();

  const isLoading = isAdding;

  const form = useForm<z.infer<typeof programFormSchema>>({
    resolver: zodResolver(programFormSchema),
    defaultValues,
  });

  function onSubmit(data: FieldValues) {
    const { success, data: programData } = programFormSchema.safeParse(data);
    console.log(success);
    if (!success) return;

    if (isEditSession && typeof programToEdit?.id === "number") {
      const changedData = getChangedFields(programData, programToEdit);

      console.log(changedData);

      if (Object.keys(changedData).length === 0) return;

      console.log(programData);

      //   updateCourse(
      //     { data: { ...changedData }, id: editId },
      //     {
      //       onSuccess: () => {
      //         form.reset();
      //         handleClose?.(false);
      //       },
      //     },
      //   );
      // } else {
      //   addCourse(courseData);
      //   form.reset();
      //   handleClose?.(false);
      // }
    } else addProgram(programData);
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="flex flex-row gap-10">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Назва курсу</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="title"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="count_hours"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem>
                <FormLabel htmlFor="count_hours">
                  Кількість навчальних годин
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    id="count_hours"
                    disabled={isLoading}
                    name={name}
                    ref={ref}
                    value={value}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange(val ? parseInt(val, 10) : undefined);
                    }}
                    onBlur={onBlur}
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
                <SpinnerMini />
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

export default ProgramForm;
