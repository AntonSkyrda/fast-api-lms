import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import { cn } from "../lib/utils/cn";
import { Skeleton } from "./skeleton";
import { SearchIcon } from "lucide-react";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface SearchBarContextProps {
  value: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  containerRef: React.RefObject<HTMLDivElement>;
  isLoading?: boolean;
  onValueChange: (value: string) => void;
}

const SearchBarContext = createContext<SearchBarContextProps | undefined>(
  undefined,
);

function useSearchBarContext() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error(
      "useSearchBarContext must be used within a SearchBar component",
    );
  }
  return context;
}

interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  isLoading?: boolean;
  children: ReactNode;
}

function SearchBar({
  value,
  onValueChange,
  isLoading,
  children,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) setOpen(false);
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) setOpen(true);

      if (event.key === "Enter" && input.value !== "") {
        onValueChange(input.value);
      }

      if (event.key === "Escape") {
        input.blur();
        setOpen(false);
      }
    },
    [isOpen, onValueChange],
  );

  const contextValue = {
    isOpen,
    setOpen,
    value,
    inputRef,
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    isLoading,
    onValueChange,
  };

  return (
    <SearchBarContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className="bg-popover text-popover-foreground flex h-full w-full flex-col rounded-md"
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </SearchBarContext.Provider>
  );
}

interface SearchInputProps {
  placeholder?: string;
  reset?: boolean;
}

function SearchInput({ placeholder = "Пошук" }: SearchInputProps) {
  const { inputRef, value, onValueChange, setOpen } = useSearchBarContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <input
        ref={inputRef}
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md border-none bg-transparent py-3 text-sm ring-0 outline-hidden outline-0 disabled:cursor-not-allowed disabled:opacity-50",
        )}
        type="search"
        id="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        minLength={2}
      />
    </div>
  );
}

interface SearchContentProps {
  className?: string;
  children?: ReactNode;
}

function SearchContent({ className, children }: SearchContentProps) {
  const { isOpen } = useSearchBarContext();

  return (
    <div className="relative mt-1">
      <div
        className={cn(
          "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
          isOpen ? "block" : "hidden",
          className,
        )}
      >
        <div className="max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto rounded-lg ring-1 ring-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
}

interface SearchListProps {
  emptyMessage?: string;
  children?: ReactNode;
}

const SearchList = ({ emptyMessage, children }: SearchListProps) => {
  const { isLoading, value } = useSearchBarContext();

  if (isLoading) {
    return (
      <div className="p-1">
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  if (!isLoading && React.Children.count(children) === 0) {
    return (
      <div className="rounded-sm px-2 py-6 text-center text-sm select-none">
        {emptyMessage ??
          `За запитом "${value}" неможливо знайти жодного ресурсу`}
      </div>
    );
  }

  return (
    <div className="text-foreground flex flex-col gap-3 overflow-hidden p-1">
      {children}
    </div>
  );
};

interface ResultProps {
  children?: ReactNode;
  handleSelect?: () => void;
  className?: string;
}

function SearchResult({
  children,
  handleSelect,
  className,
  ...props
}: ResultProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (handleSelect) {
      handleSelect();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

SearchBar.Input = SearchInput;
SearchBar.List = SearchList;
SearchBar.Content = SearchContent;
SearchBar.Result = SearchResult;

export default SearchBar;
