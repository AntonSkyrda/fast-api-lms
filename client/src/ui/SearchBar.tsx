import React, {
  createContext,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { CommandLoading } from "cmdk";
import { Skeleton } from "./skeleton";
import { cn } from "../lib/utils/cn";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface SearchBarContextProps {
  value: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isLoading?: boolean;
  isModal: boolean;
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
  isModal?: boolean;
}

function SearchBar({
  value = "",
  onValueChange,
  isLoading,
  children,
  isModal = false,
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
    containerRef,
    isLoading,
    onValueChange,
    isModal,
  };

  return (
    <SearchBarContext.Provider value={contextValue}>
      <Command
        ref={containerRef}
        className="overflow-visible rounded-lg border-b-0 md:min-w-[12rem]"
        onKeyDown={handleKeyDown}
        shouldFilter={false}
        disablePointerSelection={false}
      >
        {children}
      </Command>
    </SearchBarContext.Provider>
  );
}

interface SearchBarInputProps {
  placeholder?: string;
}

function SearchInput({ placeholder = "Пошук..." }: SearchBarInputProps) {
  const { inputRef, value, onValueChange, setOpen } = useSearchBarContext();

  return (
    <div>
      <CommandInput
        ref={inputRef}
        value={value}
        onValueChange={(value) => onValueChange(value)}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="text-base"
      />
    </div>
  );
}

interface SearchContentProps {
  className?: string;
  children?: ReactNode;
}

function SearchContent({ className, children }: SearchContentProps) {
  const { isOpen, isModal } = useSearchBarContext();

  return (
    <div className="relative mt-1">
      <div
        className={cn(
          "animate-in fade-in-0 zoom-in-95 top-0 w-full rounded-xl bg-white outline-none",
          isOpen ? "block" : "hidden",
          !isModal ? "absolute z-10" : "",
          className,
        )}
      >
        <CommandList className={cn("rounded-lg ring-1 ring-slate-200")}>
          {children}
        </CommandList>
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

  if (isLoading)
    return (
      <CommandLoading>
        <div className="p-1">
          <Skeleton className="w-full" />
        </div>
      </CommandLoading>
    );
  if (!isLoading && React.Children.count(children) === 0)
    return (
      <CommandEmpty className="rounded-sm px-2 py-3 text-center text-sm select-none">
        {emptyMessage ??
          `За запитом "${value}" неможливо знайти жодного ресурсу`}
      </CommandEmpty>
    );

  return <CommandGroup>{children}</CommandGroup>;
};

interface ResultProps {
  children?: ReactNode;
  asChild?: boolean;
  handleSelect?: () => void;
  onClick?: () => void;
  className?: string;
}

function SearchResult({
  children,
  handleSelect,
  className,
  ...props
}: ResultProps) {
  return (
    <CommandItem
      onClick={(e) => {
        e.stopPropagation();
        handleSelect?.();
      }}
      className={cn(className)}
      onSelect={() => {
        handleSelect?.();
      }}
      {...props}
    >
      {children}
    </CommandItem>
  );
}

SearchBar.Input = SearchInput;
SearchBar.List = SearchList;
SearchBar.Content = SearchContent;
SearchBar.Result = SearchResult;

export default SearchBar;
