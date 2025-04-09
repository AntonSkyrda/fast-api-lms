import axios from "axios";

import { courseDetailSchema, coursesSchema } from "../../schemas/coursesSchema";

export async function getCourses(authHeader: string) {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/courses`, {
    headers: { Authorization: authHeader },
  });
  const { success, data: courses } = await coursesSchema.safeParseAsync(
    res.data,
  );
  if (!success) throw new Error("There is Error with loading Courses data");
  return courses;
}

export async function getCourseById(id: string, authHeader: string) {
  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/courses/${id}`, {
      headers: { Authorization: authHeader },
    })
    .catch(() => {
      throw new Error("Такого курсу не існує!");
    });
  const { success, data: course } = await courseDetailSchema.safeParseAsync(
    res.data,
  );
  // console.log(error);
  if (!success) throw new Error(`There is Error with loading Courses data`);
  return course;
}
