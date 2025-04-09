import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { addUser as addUserApi } from "../../lib/services/apiAuth";
import toast from "react-hot-toast";
import { userSchema } from "../../schemas/userSchema";

const userTypes = {
  is_student: "Студента",
  is_teacher: "Викладача",
  is_superuser: "Адміністратора",
};

function whoIsUser(
  is_student: boolean,
  is_teacher: boolean,
  is_superuser: boolean,
) {
  if (is_teacher) return userTypes["is_teacher"];
  if (is_student) return userTypes["is_student"];
  if (is_superuser) return userTypes["is_superuser"];
}

type UpdateData = z.infer<typeof userSchema>;
export function useAddUser() {
  const queryClient = useQueryClient();
  const {
    mutate: addUser,
    isPending,
    error: addUserError,
  } = useMutation({
    mutationFn: (data: UpdateData) => addUserApi(data),
    onSuccess: (user) => {
      toast.success(
        `${whoIsUser(user.is_student, user.is_teacher, user.is_superuser)} ${user.first_name} успішно створено`,
      );
      queryClient.refetchQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Сталася помилка при створенні користувача.");
    },
  });

  return { addUser, isPending, addUserError };
}
