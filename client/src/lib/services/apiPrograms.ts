import { z } from "zod";
import interactWithAPI from "./apiBase";
import { programPlainSchema } from "../../schemas/plainShemas";
import {
  programFormSchema,
  programUpdateFormSchema,
} from "../../schemas/formsSchemas";
import { programPlainPartialSchema } from "../../schemas/programSchema";

export const addProgram = (data: z.infer<typeof programFormSchema>) =>
  interactWithAPI<typeof programPlainSchema, z.infer<typeof programFormSchema>>(
    {
      url: "course-programs/",
      method: "post",
      schema: programPlainSchema,
      data,
      methodErrorMessage: "Не вдалось додати нову Програму курсу!",
      serverErrorRecourseName: "Course",
    },
  );

export const updateProgram = (
  data: z.infer<typeof programUpdateFormSchema>,
  id: number,
) =>
  interactWithAPI<
    typeof programPlainPartialSchema,
    z.infer<typeof programUpdateFormSchema>
  >({
    url: `course-programs/${id}`,
    method: "patch",
    schema: programPlainPartialSchema,
    data,
    methodErrorMessage: "Не вдалось оновити цей курс!",
    serverErrorRecourseName: "Course",
  });
