import { z } from "zod";
import { ItemsContainer } from "../../ui/ItemsContainer";
import { groupsArrayShema } from "../../schemas/groupsSchema";
import Search from "../../ui/Search";
import { useCallback, useState } from "react";
import { useGroupsSearch } from "../groups/useGroupsSearch";
import SearchResults from "../../ui/SearchResults";
import { useAddGroupToCourse } from "./useAddGroupToCourse";
import { useRemoveGroupFromCourse } from "./useRemoveGroupFromCourse";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CourseGroupsProps {
  groups: z.infer<typeof groupsArrayShema>;
}

function CourseGroups({ groups }: CourseGroupsProps) {
  // const groups = [
  //   { id: 1, name: "Група 1", year_of_study: 2000 },
  //   { id: 2, name: "Група 2", year_of_study: 2001 },
  //   { id: 3, name: "Група 3", year_of_study: 2002 },
  //   { id: 4, name: "Група 3", year_of_study: 2002 },
  //   { id: 5, name: "Група 3", year_of_study: 2002 },
  //   { id: 6, name: "Група 3", year_of_study: 2002 },
  //   { id: 7, name: "Група 3", year_of_study: 2002 },
  //   { id: 8, name: "Група 3", year_of_study: 2002 },
  //   { id: 9, name: "Група 3", year_of_study: 2002 },
  //   { id: 10, name: "Група 3", year_of_study: 2002 },
  //   { id: 11, name: "Група 3", year_of_study: 2002 },
  //   { id: 12, name: "Група 3", year_of_study: 2002 },
  //   { id: 13, name: "Група 3", year_of_study: 2002 },
  //   { id: 14, name: "Група 3", year_of_study: 2002 },
  // ];

  const queryClient = useQueryClient();
  const [searchStr, setSearchStr] = useState("");
  const groupsData = useGroupsSearch(searchStr);

  const { addGroupToCourse, isPending } = useAddGroupToCourse();
  const { removeGroupFromCourse } = useRemoveGroupFromCourse();

  const isLoading = groupsData.isLoading || isPending;

  const availableGroups = groupsData.groups.filter(
    (availableGroup) =>
      !groups.map((group) => group.id).includes(availableGroup.id),
  );

  const clear = useCallback(
    function () {
      queryClient.removeQueries({ queryKey: ["groups"] });
      setSearchStr("");
    },
    [queryClient],
  );

  function hadnleAddGroup(groupId: number) {
    if (!groupId) return toast.error("Неможливо отримати дані про курс");

    if (typeof groupId !== "number") return;

    addGroupToCourse(groupId);
    clear();
  }

  return (
    <ItemsContainer>
      <ItemsContainer.Header>
        <ItemsContainer.Title>Групи</ItemsContainer.Title>
      </ItemsContainer.Header>

      <ItemsContainer.Content>
        <ItemsContainer.ItemsList emptyMessage="Жодна група не додана до курсу">
          {groups.map((group) => (
            <ItemsContainer.Item
              key={group.id}
              onAction={() => removeGroupFromCourse(group.id)}
            >
              {group.name}
            </ItemsContainer.Item>
          ))}
        </ItemsContainer.ItemsList>

        <ItemsContainer.Footer>
          <ItemsContainer.AddButton>Додати групу</ItemsContainer.AddButton>
        </ItemsContainer.Footer>

        <ItemsContainer.ItemsDialog
          title="Додавання Групи"
          description="Оберіть групу, яку хочете додати"
          handleClear={clear}
        >
          <Search
            placeholder="Пошук груп"
            searchStr={searchStr}
            onSearchChange={setSearchStr}
          />
          <SearchResults
            searchStr={searchStr}
            recourseName="Групи"
            resultsLength={availableGroups.length}
            isLoading={isLoading}
          >
            {availableGroups.map((group) => (
              <li key={group.id}>
                <ItemsContainer.AvailableItem
                  onAddItem={() => hadnleAddGroup(group.id)}
                >
                  {group.name}
                </ItemsContainer.AvailableItem>
              </li>
            ))}
          </SearchResults>
        </ItemsContainer.ItemsDialog>
      </ItemsContainer.Content>
    </ItemsContainer>
  );
}

export default CourseGroups;
