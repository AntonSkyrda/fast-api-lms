import { ItemsContainer } from "../../ui/ItemsContainer";
import { useCallback, useState } from "react";
import { useAddGroupToCourse } from "./useAddGroupToCourse";
import { useRemoveGroupFromCourse } from "./useRemoveGroupFromCourse";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import GroupsSearch from "../groups/GroupsSearch";
import { Groups } from "../../types/dataTypes";

interface CourseGroupsProps {
  groupsFromCourse: Groups;
}

function CourseGroups({ groupsFromCourse }: CourseGroupsProps) {
  const queryClient = useQueryClient();
  const [searchStr, setSearchStr] = useState("");

  const { addGroupToCourse, isPending } = useAddGroupToCourse();
  const { removeGroupFromCourse } = useRemoveGroupFromCourse();

  const clear = useCallback(
    function () {
      queryClient.removeQueries({ queryKey: ["groups"] });
      setSearchStr("");
    },
    [queryClient],
  );

  function handleAddGroup(groupId: number) {
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
              <NavLink to={`/groups?groupId=${group.id}`}>{group.name}</NavLink>
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
          className="min-h-[12rem] overflow-hidden"
        >
          <GroupsSearch
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            handleAddGroup={handleAddGroup}
            isLoading={isPending}
            groupsFromCourse={groupsFromCourse}
          />
        </ItemsContainer.ItemsDialog>
      </ItemsContainer.Content>
    </ItemsContainer>
  );
}

export default CourseGroups;
