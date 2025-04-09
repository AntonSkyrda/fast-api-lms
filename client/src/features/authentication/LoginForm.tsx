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
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../../schemas/loginFormSchema";
import { z } from "zod";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@admin.com",
      password: "password",
    },
  });

  const { login, isLoading, loginError } = useAuth();

  function onSubmit(data: FieldValues) {
    const { email, password } = data;
    login(email, password);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel htmlFor="password">Пароль</FormLabel>
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
        <div className="flex flex-col items-center justify-center gap-5">
          <Button disabled={isLoading} size="lg" type="submit">
            {isLoading ? "Вхід..." : "Увійти"}
          </Button>
          {loginError && <p className="text-destructive">{loginError}</p>}
        </div>
      </form>
    </Form>
  );
}
