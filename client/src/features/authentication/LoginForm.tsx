import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

import { FieldValues, useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../schemas/loginFormSchema";
import { z } from "zod";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login, isPending, loginError } = useLogin();

  function onSubmit(data: FieldValues) {
    const { username, password } = data;
    login({ username, password });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username чи Email</FormLabel>
              <FormControl>
                <Input
                  type="username"
                  id="username"
                  autoComplete="username"
                  disabled={isPending}
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
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="password"
                  autoComplete="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center justify-center gap-5">
          <Button disabled={isPending} size="lg" type="submit">
            {isPending ? "Вхід..." : "Увійти"}
          </Button>
          {loginError && (
            <p className="text-destructive">{loginError.message}</p>
          )}
        </div>
      </form>
    </Form>
  );
}
