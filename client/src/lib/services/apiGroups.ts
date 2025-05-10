import { z } from "zod";
import { ITEMS_PER_PAGE } from "../consts";
import interactWithAPI from "./apiBase";
import { groupDetailedSchema, groupsSchema } from "../../schemas/groupsSchema";
import {
  groupFormSchema,
  groupUpdateSchemaPartial,
} from "../../schemas/formsSchemas";
import { groupPlainSchema } from "../../schemas/plainShemas";

// Отримання списку груп з пагінацією
export const getGroups = (offset: number = 0) =>
  interactWithAPI<typeof groupsSchema, object>({
    url: `groups?limit=${ITEMS_PER_PAGE}&offset=${offset * ITEMS_PER_PAGE}`,
    method: "get",
    schema: groupsSchema,
    methodErrorMessage: "Сталася помилка при отриманні груп.",
    serverErrorRecourseName: "Groups",
  });

export const findGroups = (searchStr: string) =>
  interactWithAPI<typeof groupsSchema, object>({
    url: `groups?search=${searchStr}`,
    method: "get",
    schema: groupsSchema,
    methodErrorMessage: "Сталася помилка при пошуку груп.",
    serverErrorRecourseName: "Groups",
  });

export const addGroup = (data: z.infer<typeof groupFormSchema>) =>
  interactWithAPI<typeof groupPlainSchema, z.infer<typeof groupFormSchema>>({
    url: "groups/",
    method: "post",
    schema: groupPlainSchema,
    data,
    methodErrorMessage: "Не вдалось створити нову групу!",
    serverErrorRecourseName: "Group",
  });

export const getGroupById = (id: string) =>
  interactWithAPI<typeof groupDetailedSchema, object>({
    url: `groups/${id}/`,
    method: "get",
    schema: groupDetailedSchema,
    methodErrorMessage: "Такої групи не існує!",
    serverErrorRecourseName: "Group",
  });

export const updateGroupPatch = (
  data: z.infer<typeof groupUpdateSchemaPartial>,
  id: number,
) =>
  interactWithAPI<
    typeof groupPlainSchema,
    z.infer<typeof groupUpdateSchemaPartial>
  >({
    url: `groups/${id}`,
    method: "patch",
    schema: groupPlainSchema,
    data,
    methodErrorMessage: "Не вдалось оновити групу!",
    serverErrorRecourseName: "Group",
  });

export const deleteGroup = (id: number) =>
  interactWithAPI<z.ZodVoid, object>({
    url: `groups/${id}`,
    method: "delete",
    schema: z.void(),
    methodErrorMessage: "Не вдалось видалити групу!",
    serverErrorRecourseName: "Group",
  });

export const addStudentToGroup = (groupId: number, studentId: number) =>
  interactWithAPI<typeof groupDetailedSchema, object>({
    url: `groups/${groupId}/students/${studentId}/`,
    method: "post",
    schema: groupDetailedSchema,
    methodErrorMessage: "Не вдалось додати студента до групи!",
    serverErrorRecourseName: "Group",
  });

export const removeStudentFromGroup = (groupId: number, studentId: number) =>
  interactWithAPI<typeof groupDetailedSchema, object>({
    url: `groups/${groupId}/students/${studentId}/`,
    method: "delete",
    schema: groupDetailedSchema,
    methodErrorMessage: "Не вдалось видалити студента з групи!",
    serverErrorRecourseName: "Group",
  });
