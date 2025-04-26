import { z } from "zod";
import { programFormSchema } from "../../schemas/formsSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProgram as addProgramApi } from "../../lib/services/apiPrograms";
import toast from "react-hot-toast";

type Data = z.infer<typeof programFormSchema>;
export function useAddProgram() {
  const queryClient = useQueryClient();

  const {
    mutate: addProgram,
    isPending,
    error: addProgramError,
  } = useMutation({
    mutationFn: (data: Data) => addProgramApi(data),
    onSuccess: (program) => {
      toast.success(`Курс ${program.title} успішно створено!`);
      queryClient.refetchQueries({ queryKey: ["course", program.course_id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addProgram, isPending, addProgramError };
}
