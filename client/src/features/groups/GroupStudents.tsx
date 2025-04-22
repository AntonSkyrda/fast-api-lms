import { z } from "zod";
import { useAuth } from "../../contexts/Auth/useAuth";
import { ItemsContainer } from "../../ui/ItemsContainer";
import Search from "../../ui/Search";
import SearchResults from "../../ui/SearchResults";
import { groupDetailedSchema } from "../../schemas/groupsSchema";
import { useAddStudentToGroup } from "./useAddStudentToGroup";
import { useCallback, useState } from "react";
import { useStudentsSearch } from "../users/useStudentsSearch";
import { useRemoveStudentFromGroup } from "./useRemoveStudentFromGroup";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface GroupStudentsProps {
  group: z.infer<typeof groupDetailedSchema>;
}

function GroupStudents({ group }: GroupStudentsProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { addStudentToGroup } = useAddStudentToGroup();
  const { removeStudentFromGroup } = useRemoveStudentFromGroup();

  const [searchStr, setSearchStr] = useState("");
  const studentsData = useStudentsSearch(searchStr);

  const availableStudents = studentsData.students.filter(
    (availableStudent) =>
      !group?.students
        .map((student) => student.id)
        .includes(availableStudent.id),
  );

  const clear = useCallback(
    function () {
      queryClient.removeQueries({ queryKey: ["students"] });
      setSearchStr("");
    },
    [queryClient],
  );

  function handleAddStudent(studentId: number) {
    if (!group?.id) return toast.error("Неможливо отримати дані про курс");

    if (typeof studentId !== "number") return;

    addStudentToGroup(studentId);
    clear();
  }

  return (
    <ItemsContainer>
      <ItemsContainer.Header>Студенти</ItemsContainer.Header>
      <ItemsContainer.Content>
        <ItemsContainer.ItemsList>
          {group.students.map((student) => (
            <ItemsContainer.Item
              key={student.id}
              isActionAvailable={user?.is_superuser}
              onAction={() => removeStudentFromGroup(student.id)}
            >
              <NavLink to={`/students?studentId=${student.id}`}>
                {student.last_name} {student.first_name} {student.father_name}
              </NavLink>
            </ItemsContainer.Item>
          ))}
        </ItemsContainer.ItemsList>
        <ItemsContainer.Footer>
          {user?.is_superuser && (
            <ItemsContainer.AddButton>
              Додати студентів до групи
            </ItemsContainer.AddButton>
          )}
        </ItemsContainer.Footer>

        <ItemsContainer.ItemsDialog
          title="Додавання студента"
          description="оберіть студента, якого хочете додати"
          handleClear={clear}
        >
          <Search
            placeholder="Пошук студентів"
            searchStr={searchStr}
            onSearchChange={setSearchStr}
          />

          <SearchResults
            searchStr={searchStr}
            recourseName="Студенти"
            resultsLength={availableStudents.length}
            isLoading={studentsData.isLoading}
          >
            {availableStudents.map((student) => (
              <li key={student.id}>
                <ItemsContainer.AvailableItem
                  onAddItem={() => handleAddStudent(student.id)}
                >
                  {student.last_name} {student.first_name} {student.father_name}
                </ItemsContainer.AvailableItem>
              </li>
            ))}
          </SearchResults>
        </ItemsContainer.ItemsDialog>
      </ItemsContainer.Content>
    </ItemsContainer>
  );
}

export default GroupStudents;
