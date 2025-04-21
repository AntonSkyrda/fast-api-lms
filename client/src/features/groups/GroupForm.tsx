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
import { groupFormSchema } from "../../schemas/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useAddGroup } from "./useAddGroup";
import Spinner from "../../ui/Spinner";
import { useUpdateGroup } from "./useUpdateGroup";
import { useEffect } from "react";
import { groupPlainSchema } from "../../schemas/plainShemas";
import { getChangedFields } from "../../lib/utils/getChangedFields";

interface CourseFormProps {
  isOpen: boolean;
  handleClose: (isOpen: boolean) => void;
  groupToEdit?: z.infer<typeof groupPlainSchema>;
}
function GroupForm({ isOpen, handleClose, groupToEdit }: CourseFormProps) {
  const { id: editId, ...editValues } = groupToEdit ?? {};

  const isEditSession = Boolean(editId);

  const { addGroup, isPending: isAdding } = useAddGroup();
  const { updateGroup, isPending: isUpdating } = useUpdateGroup();

  const isLoading = isAdding || isUpdating;

  const form = useForm<z.infer<typeof groupFormSchema>>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: isEditSession
      ? editValues
      : { name: "", year_of_study: new Date().getFullYear() },
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
    const formData = {
      ...data,
      year_of_study:
        typeof data.year_of_study === "string"
          ? parseInt(data.year_of_study, 10)
          : data.year_of_study,
    };

    const { success, data: groupData } = groupFormSchema.safeParse(formData);
    if (!success) return;

    if (isEditSession && typeof editId === "number") {
      const changedData = getChangedFields(groupData, editValues);

      console.log(changedData);

      if (Object.keys(changedData).length === 0) return;

      updateGroup(
        { data: { ...changedData }, id: editId },
        {
          onSuccess: () => {
            form.reset();
            handleClose(false);
          },
        },
      );
    } else {
      addGroup(groupData);
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
                <FormLabel htmlFor="name">Назва Групи</FormLabel>
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
            name="year_of_study"
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <FormItem>
                <FormLabel htmlFor="year_of_study">Рік навчання</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    id="year_of_study"
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

export default GroupForm;
