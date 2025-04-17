import { Button } from "../../ui/Button";
import UsersTable from "./UsersTable";

interface UsersDataProps {
  usersType: "teachers" | "students";
  handleUsersTypeChange: (usersType: "teachers" | "students") => void;
}

function UsersData({ usersType, handleUsersTypeChange }: UsersDataProps) {
  return (
    <section className="grid grid-rows-[auto_1fr] items-center justify-center gap-8">
      <div className="flex flex-row justify-center gap-5">
        <Button
          onClick={() => handleUsersTypeChange("teachers")}
          variant={usersType === "teachers" ? "outline" : "default"}
        >
          Викладачі
        </Button>
        <Button
          onClick={() => handleUsersTypeChange("students")}
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
