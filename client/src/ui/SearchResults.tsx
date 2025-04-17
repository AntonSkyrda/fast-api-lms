import { ReactNode } from "react";
import Spinner from "./Spinner";

interface SearchResultsChange {
  searchStr: string;
  recourseName: string;
  resultsLength: number | undefined;
  isLoading: boolean;
  // onSelect?: <T extends string | number>(value: T) => void;
  children: ReactNode;
}

function SearchResults({
  recourseName,
  searchStr,
  resultsLength,
  isLoading = false,
  children,
}: SearchResultsChange) {
  if (searchStr && resultsLength === 0)
    return (
      <p>
        Не вдалось знайти {recourseName} за запитом {searchStr}
      </p>
    );

  if (isLoading) return <Spinner />;

  return <ul className="flex flex-col gap-2">{children}</ul>;
}

export default SearchResults;
