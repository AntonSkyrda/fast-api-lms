import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";
import { useEffect } from "react";

interface SearchProps {
  searchStr: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  reset?: boolean;
}

function Search({
  searchStr,
  onSearchChange,
  placeholder = "Пошук",
  // isLoading = false,
  reset = false,
}: SearchProps) {
  const form = useForm({
    defaultValues: {
      search: searchStr,
    },
  });

  function handleSearch() {
    const { search } = form.getValues();
    onSearchChange(search);
  }

  useEffect(
    function () {
      if (reset) {
        form.reset();
      }
    },
    [reset, form],
  );

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(handleSearch)}
        onSubmit={(e) => e.preventDefault()}
        autoFocus
      >
        <FormField
          name="search"
          render={() => (
            <FormItem>
              <Input
                type="search"
                id="search"
                // disabled={isLoading}
                placeholder={placeholder}
                {...form.register("search", {
                  minLength: {
                    value: 3,
                    message: "Введіть хоча б 3 символи, щоб почати пошук",
                  },
                })}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default Search;
