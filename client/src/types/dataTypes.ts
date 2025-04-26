import { z } from "zod";
import {
  coursePlainSchema,
  groupPlainSchema,
  programPlainSchema,
  userSchema,
} from "../schemas/plainShemas";
import {
  courseDetailedSchema,
  coursesArrayShema,
} from "../schemas/coursesSchema";
import { groupDetailedSchema, groupsArrayShema } from "../schemas/groupsSchema";
import {
  studentSchema,
  studentsSchema,
  teacherSchema,
  teachersSchema,
} from "../schemas/usersSchema";
import { programsArraySchema } from "../schemas/programSchema";

export type CoursePlain = z.infer<typeof coursePlainSchema>;
export type CourseDetailed = z.infer<typeof courseDetailedSchema>;
export type Courses = z.infer<typeof coursesArrayShema>;

export type GroupPlain = z.infer<typeof groupPlainSchema>;
export type GroupDetailed = z.infer<typeof groupDetailedSchema>;
export type Groups = z.infer<typeof groupsArrayShema>;

export type Program = z.infer<typeof programPlainSchema>;
export type Programs = z.infer<typeof programsArraySchema>;

export type User = z.infer<typeof userSchema>;
export type Student = z.infer<typeof studentSchema>;
export type Students = z.infer<typeof studentsSchema>;
export type Teacher = z.infer<typeof teacherSchema>;
export type Teachers = z.infer<typeof teachersSchema>;
