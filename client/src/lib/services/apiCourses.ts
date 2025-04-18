import {
  courseDetailedSchema,
  coursePlainPartialSchema,
  coursesSchema,
} from "../../schemas/coursesSchema";
import { z } from "zod";
import {
  courseFormSchema,
  courseUpdateSchemaPartial,
} from "../../schemas/formsSchemas";
import { coursePlainSchema } from "../../schemas/plainShemas";
import { ITEMS_PER_PAGE } from "../consts";
import interactWithAPI from "./apiBase";

export const getCourses = (offset: number = 0) =>
  interactWithAPI<typeof coursesSchema, object>({
    url: `courses?limit=${ITEMS_PER_PAGE}&offset=${offset * ITEMS_PER_PAGE}`,
    method: "get",
    schema: coursesSchema,
    methodErrorMessage: "Сталася помилка при отриманні курсів.",
    serverErrorRecourseName: "Courses",
  });

export const findCourses = (searchStr: string = "") =>
  interactWithAPI<typeof coursesSchema, object>({
    url: `courses?search=${searchStr}`,
    method: "get",
    schema: coursesSchema,
    methodErrorMessage: "Сталася помилка при отриманні курсів.",
    serverErrorRecourseName: "Courses",
  });

export const getCourseById = (id: string) =>
  interactWithAPI<typeof courseDetailedSchema, object>({
    url: `courses/${id}/`,
    method: "get",
    schema: courseDetailedSchema,
    methodErrorMessage: "Такого курсу не існує!",
    serverErrorRecourseName: "Course",
  });

export const addCourse = (data: z.infer<typeof courseFormSchema>) =>
  interactWithAPI<typeof coursePlainSchema, z.infer<typeof courseFormSchema>>({
    url: "courses/",
    method: "post",
    schema: coursePlainSchema,
    data,
    methodErrorMessage: "Не вдалось додати новий курс!",
    serverErrorRecourseName: "Course",
  });

export const updateCourse = (
  data: z.infer<typeof courseUpdateSchemaPartial>,
  id: number,
) =>
  interactWithAPI<
    typeof coursePlainPartialSchema,
    z.infer<typeof courseUpdateSchemaPartial>
  >({
    url: `courses/${id}`,
    method: "patch",
    schema: coursePlainPartialSchema,
    data,
    methodErrorMessage: "Не вдалось оновити цей курс!",
    serverErrorRecourseName: "Course",
  });

export const deleteCourse = (id: number) =>
  interactWithAPI<z.ZodVoid, object>({
    url: `courses/${id}`,
    method: "delete",
    schema: z.void(),
    methodErrorMessage: "Не вдалось видалити цей курс!",
    serverErrorRecourseName: "Course",
  });

export const addTeacherToCourse = (courseId: number, teacherId: number) =>
  interactWithAPI<typeof courseDetailedSchema, object>({
    url: `courses/${courseId}/add-teacher/${teacherId}`,
    method: "post",
    schema: courseDetailedSchema,
    methodErrorMessage: "Не вдалось додати викладача до цього курс!",
    serverErrorRecourseName: "Course",
  });

export const removeTeacherFromCourse = (courseId: number) =>
  interactWithAPI<typeof courseDetailedSchema, object>({
    url: `courses/${courseId}/teacher`,
    method: "delete",
    schema: courseDetailedSchema,
    methodErrorMessage: "Не вдалось видалити викладача до цього курс!",
    serverErrorRecourseName: "Course",
  });
