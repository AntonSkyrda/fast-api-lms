import { z } from "zod";
import { ItemsContainer } from "../../ui/ItemsContainer";
import { groupsArrayShema } from "../../schemas/groupsSchema";
import { useCallback, useMemo, useState } from "react";
import { useGroupsSearch } from "../groups/useGroupsSearch";
import { useAddGroupToCourse } from "./useAddGroupToCourse";
import { useRemoveGroupFromCourse } from "./useRemoveGroupFromCourse";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SearchBar from "../../ui/SearchBar";
import { useGroups } from "../groups/useGroups";

interface CourseGroupsProps {
  groupsFromCourse: z.infer<typeof groupsArrayShema>;
}

function CourseGroups({ groupsFromCourse }: CourseGroupsProps) {
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
  const { groups, isLoading } = useGroups();
  const groupsData = useGroupsSearch(searchStr);

  const { addGroupToCourse, isPending } = useAddGroupToCourse();
  const { removeGroupFromCourse } = useRemoveGroupFromCourse();

  const isWorking = groupsData.isLoading || isPending || isLoading;

  const availableGroups = groupsData.groups.filter(
    (availableGroup) =>
      !groupsFromCourse.map((group) => group.id).includes(availableGroup.id),
  );

  const groupsToRender = useMemo(() => {
    if (searchStr.length <= 1) return groups;
    return groupsData.groups.length > 0 ? availableGroups : [];
  }, [searchStr, groups, groupsData.groups, availableGroups]);

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
          {groupsFromCourse.map((group) => (
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
          className="min-h-[18rem] overflow-hidden"
        >
          <SearchBar
            value={searchStr}
            isLoading={isWorking}
            onValueChange={setSearchStr}
            isModal={true}
          >
            <SearchBar.Input placeholder="Пошук курсів" />
            <SearchBar.Content>
              <SearchBar.List
                emptyMessage={`За запитом ${searchStr} Не знайдено жодного курсу`}
              >
                {groupsToRender.map((group) => (
                  // <SearchBar.Result key={group.id}>
                  <ItemsContainer.AvailableItem
                    key={group.id}
                    onAddItem={() => hadnleAddGroup(group.id)}
                  >
                    {group.name}
                  </ItemsContainer.AvailableItem>
                  // </SearchBar.Result>
                ))}
              </SearchBar.List>
            </SearchBar.Content>
          </SearchBar>
        </ItemsContainer.ItemsDialog>
      </ItemsContainer.Content>
    </ItemsContainer>
  );
}

export default CourseGroups;
