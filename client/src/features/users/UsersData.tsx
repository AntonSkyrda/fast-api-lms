import { useState } from "react";
import { Button } from "../../ui/Button";
import UsersTable from "./UsersTable";

function UsersData() {
  const [usersType, setUsersType] = useState<"teachers" | "students">(
    "teachers",
  );
  return (
    <section className="grid grid-rows-[auto_1fr] items-center justify-center gap-8">
      <div className="flex flex-row justify-center gap-5">
        <Button
          onClick={() => setUsersType("teachers")}
          variant={usersType === "teachers" ? "outline" : "default"}
        >
          Викладачі
        </Button>
        <Button
          onClick={() => setUsersType("students")}
          variant={usersType === "students" ? "outline" : "default"}
        >
          Студенти
        </Button>
      </div>
      <UsersTable usersType={usersType} />
    </section>
  );
}

export default UsersData;
