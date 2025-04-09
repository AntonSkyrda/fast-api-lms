import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { z } from "zod";
import { courseSchema } from "../../schemas/coursesSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function CreateCurseForm() {
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      description: "",
      teacher: 0,
      groups: [],
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-8"></form>
    </Form>
  );
}

export default CreateCurseForm;
