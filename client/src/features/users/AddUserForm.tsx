import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { userSchema } from "../../schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";

import { z } from "zod";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import { useAddUser } from "./useAddUser";

function AddUserForm({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      father_name: "",
      is_teacher: false,
      is_student: false,
      is_superuser: false,
      is_active: true,
      is_verified: false,
    },
  });

  const { addUser, isPending: isLoading } = useAddUser();

  function onSubmit(data: FieldValues) {
    const { success, data: userData } = userSchema.safeParse(data);
    if (!success) return;
    addUser(userData);
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-10"
      >
        <fieldset className="space-y-8">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    id="password"
                    autoComplete="password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first_name">Імʼя</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="first_name"
                    autoComplete="first_name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="last_name">Фамілія</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="last_name"
                    autoComplete="last_name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="father_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="father_name">По-батькові</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="father_name"
                    autoComplete="father_name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset className="space-y-8">
          <FormField
            name="is_student"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="is_student"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="is_student">Студент</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            name="is_teacher"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="is_teacher"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="is_teacher">Викладач</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            name="is_superuser"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="is_superuser"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="is_superuser">Адміністратор</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="is_active"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="is_active">Активний</FormLabel>
              </FormItem>
            )}
          />
        </fieldset>
        <div className="row-span-2">
          <Button variant="default" type="submit">
            <span>Створити</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddUserForm;
