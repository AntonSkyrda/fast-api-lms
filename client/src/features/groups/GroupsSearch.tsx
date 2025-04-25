import SearchBar from "../../ui/SearchBar";
import { useGroupsSearch } from "./useGroupsSearch";
import { Groups } from "../../types/dataTypes";
import { useItemsContainer } from "../../contexts/ItemsContainer/ItemsContainerProvider";

interface GroupsSearchProps {
  searchStr: string;
  isLoading: boolean;
  setSearchStr: (value: string) => void;
  handleAddGroup: (id: number) => void;
  groupsFromCourse: Groups;
}

function GroupsSearch({
  searchStr,
  setSearchStr,
  groupsFromCourse,
  handleAddGroup,
  isLoading,
}: GroupsSearchProps) {
  const { setIsDialogOpen } = useItemsContainer();
  const { groups, isLoading: isLoadingGroups } = useGroupsSearch(searchStr);

  const availableGroups = groups.filter(
    (availableGroup) =>
      !groupsFromCourse.map((group) => group.id).includes(availableGroup.id),
  );

  const isWorking = isLoading || isLoadingGroups;
  return (
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
          {availableGroups.map((group) => (
            <SearchBar.Result
              key={group.id}
              handleSelect={() => {
                setIsDialogOpen(false);
                handleAddGroup(group.id);
              }}
            >
              {group.name}
            </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default GroupsSearch;
