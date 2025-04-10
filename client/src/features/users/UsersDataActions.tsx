import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import { studentSchema, teacherSchema } from "../../schemas/userSchema";
import { EllipsisVertical } from "lucide-react";

interface UsersDataActionsProps {
  user: z.infer<typeof teacherSchema> | z.infer<typeof studentSchema>;
}

function UsersDataActions({ user }: UsersDataActionsProps) {
  console.log(user);
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={8}
        className="flex w-48 flex-col gap-2"
      >
        <span>Детальніше</span>
        <span>Редагувати</span>
        <span>Видалити</span>
      </PopoverContent>
    </Popover>
  );
}

export default UsersDataActions;
