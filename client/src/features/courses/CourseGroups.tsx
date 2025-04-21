import { z } from "zod";
import { ItemsContainer } from "../../ui/ItemsContainer";
import { groupsArrayShema } from "../../schemas/groupsSchema";
import Search from "../../ui/Search";
import { useState } from "react";
import { useGroupsSearch } from "../groups/useGroupsSearch";
import SearchResults from "../../ui/SearchResults";
import { useAddGroupToCourse } from "./useAddGroupToCourse";
import { useRemoveGroupFromCourse } from "./useRemoveGroupFromCourse";

interface CourseGroupsProps {
  groups: z.infer<typeof groupsArrayShema>;
}

function CourseGroups({ groups }: CourseGroupsProps) {
  const [searchStr, setSearchStr] = useState("");
  const groupsData = useGroupsSearch(searchStr);

  const { addGroupToCourse, isPending } = useAddGroupToCourse();
  const { removeGroupFromCourse } = useRemoveGroupFromCourse();

  const isLoading = groupsData.isLoading || isPending;

  const availableGroups = groupsData.groups.filter(
    (availableGroup) =>
      !groups.map((group) => group.id).includes(availableGroup.id),
  );

  function hadnleAddGroup(groupId: number) {
    addGroupToCourse(groupId);
    setSearchStr("");
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
          <ItemsContainer.AddButton />
        </ItemsContainer.Footer>

        <ItemsContainer.ItemsDialog>
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
