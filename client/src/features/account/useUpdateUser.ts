import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateUser as updateUserApi } from "../../lib/services/apiUsers";
import toast from "react-hot-toast";
import { userUpdateFormSchema } from "../../schemas/formsSchemas";

type UpdateData = z.infer<typeof userUpdateFormSchema>;
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isPending,
    error: updateUserError,
  } = useMutation({
    mutationFn: (data: UpdateData) => updateUserApi(data),
    onSuccess: () => {
      toast.success("Дані успішно оновленні!");
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Сталася помилка при оновленні даних.");
    },
  });

  return { updateUser, isPending, updateUserError };
}
