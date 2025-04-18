import { ITEMS_PER_PAGE } from "../consts";
import interactWithAPI from "./apiBase";
import { groupsSchema } from "../../schemas/groupsSchema";

export const getGroups = (offset: number) =>
  interactWithAPI<typeof groupsSchema, object>({
    url: `groups?limit=${ITEMS_PER_PAGE}&offset=${offset * ITEMS_PER_PAGE}`,
    method: "get",
    schema: groupsSchema,
    methodErrorMessage: "Сталася помилка при отриманні груп.",
    serverErrorRecourseName: "Groups",
  });

export const findGroups = (searchStr: string) =>
  interactWithAPI<typeof groupsSchema, object>({
    url: `courses?search=${searchStr}`,
    method: "get",
    schema: groupsSchema,
    methodErrorMessage: "Сталася помилка при отриманні груп.",
    serverErrorRecourseName: "Groups",
  });

// export const getGroupById =
