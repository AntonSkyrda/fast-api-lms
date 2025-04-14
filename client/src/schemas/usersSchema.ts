import { z } from "zod";
import { userSchema } from "./plainShemas";

// User scheme with student permisions
export const studentSchema = userSchema.extend({
  is_student: z.literal(true),
});

// Array of students scheme
export const studentsSchema = z.array(studentSchema);

// User scheme with teacher permisions
export const teacherSchema = userSchema.extend({
  is_teacher: z.literal(true),
});

// Array of teacher scheme
export const teachersSchema = z.array(teacherSchema);

// User scheme with superuser permisions
export const superuserSchema = userSchema.extend({
  is_superuser: z.literal(true),
});

// Array of superusers scheme
export const superusersSchema = z.array(superuserSchema);

// for dev purpouse only
export const studentTeacherSchema = userSchema.extend({
  is_student: z.literal(true),
  is_teacher: z.literal(true),
});
