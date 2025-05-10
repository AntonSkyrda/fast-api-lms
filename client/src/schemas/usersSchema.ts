import { z } from "zod";
import { userSchema } from "./plainShemas";
import { backendResponseForListsSchema } from "./backendResponseForListsSchema";

// User scheme with student permisions
export const studentSchema = userSchema.extend({
  is_student: z.literal(true),
});

export const studentArraySchema = z.array(studentSchema);

// Array of students scheme
export const studentsSchema = backendResponseForListsSchema.extend({
  items: studentArraySchema,
});

// User scheme with teacher permisions
export const teacherSchema = userSchema.extend({
  is_teacher: z.literal(true),
});

export const teacherArraySchema = z.array(teacherSchema);

// Array of teacher scheme
export const teachersSchema = backendResponseForListsSchema.extend({
  items: teacherArraySchema,
});

// User scheme with superuser permisions
export const superuserSchema = userSchema.extend({
  is_superuser: z.literal(true),
});

export const superuserArraySchema = z.array(superuserSchema);

// Array of superusers scheme
export const superusersSchema = backendResponseForListsSchema.extend({
  items: superuserArraySchema,
});

// for dev purpouse only
export const studentTeacherSchema = userSchema.extend({
  is_student: z.literal(true),
  is_teacher: z.literal(true),
});
