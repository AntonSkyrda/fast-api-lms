import { z } from "zod";
// import { studentSchema } from "./userSchema";
import { studentsSchema } from "./userSchema";

export const groupSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(255),
  year_number: z.number().int().min(0).max(92233720368547),
  // students: z.array(studentSchema),
  students: z.array(studentsSchema).optional(),
});
