import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { addGroup as addGroupApi } from "../../lib/services/apiGroups";
import toast from "react-hot-toast";
import { groupFormSchema } from "../../schemas/formsSchemas";

type Data = z.infer<typeof groupFormSchema>;
export function useAddGroup() {
  const queryClient = useQueryClient();

  const {
    mutate: addGroup,
    isPending,
    error: addGroupError,
  } = useMutation({
    mutationFn: (data: Data) => addGroupApi(data),
    onSuccess: (group) => {
      toast.success(`Групу ${group.name} успішно створено!`);
      queryClient.refetchQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addGroup, isPending, addGroupError };
}
