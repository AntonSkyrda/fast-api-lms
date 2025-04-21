import { createContext, useContext, useMemo, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/utils/cn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Plus, X } from "lucide-react";
import { Button } from "./button";

type ItemsContextType = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
};

const ItemsContext = createContext<ItemsContextType | null>(null);

function useItemsContainer() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItemsContainer must be used within ItemsProvider");
  }
  return context;
}

interface ItemsContainerProps {
  children: React.ReactNode;
  className?: string;
}

function ItemsContainer({
  children,
  className,
  ...props
}: ItemsContainerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const contextValue: ItemsContextType = useMemo(
    () => ({
      isDialogOpen,
      setIsDialogOpen,
    }),
    [isDialogOpen, setIsDialogOpen],
  );

  return (
    <ItemsContext.Provider value={contextValue}>
      <div
        className={cn(
          "border-border bg-card overflow-hidden rounded-lg border shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ItemsContext.Provider>
  );
}

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

function Header({ className, children, ...props }: HeaderProps) {
  return (
    <div
      className={cn("bg-muted/50 border-border border-b p-4", className)}
      data-slot="items-header"
      {...props}
    >
      {children}
    </div>
  );
}

interface TitleProps {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

function Title({ children, className, asChild = false, ...props }: TitleProps) {
  const Comp = asChild ? Slot : "h3";
  return (
    <Comp
      className={cn("text-lg font-medium", className)}
      data-slot="items-title"
      {...props}
    >
      {children}
    </Comp>
  );
}

interface ContentProps {
  className?: string;
  children?: React.ReactNode;
}

function Content({ className, children, ...props }: ContentProps) {
  return (
    <div className={cn("p-4", className)} data-slot="items-content" {...props}>
      {children}
    </div>
  );
}

interface ItemsListProps {
  className?: string;
  children?: React.ReactNode;
  emptyMessage?: string;
}

function ItemsList({
  className,
  children,
  emptyMessage = "Немає доданих елементів",
  ...props
}: ItemsListProps) {
  return (
    <div
      className={cn("flex min-h-24 flex-wrap gap-2", className)}
      data-slot="items-list"
      {...props}
    >
      {children?.toString().length ? (
        <>{children}</>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-muted-foreground text-center italic">
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}

interface ItemProps {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  onAction?<T>(itemId: T): void;
}

function Item({
  className,
  children,
  asChild = false,
  onAction,
  ...props
}: ItemProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="items-item"
      {...props}
    >
      {children}

      <button
        onClick={onAction}
        className="text-muted-foreground hover:text-destructive ml-1"
      >
        <X size={16} />
      </button>
    </Comp>
  );
}

interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}

function Footer({ className, children, ...props }: FooterProps) {
  return (
    <div
      className={cn(
        "border-border mt-4 flex justify-end border-t pt-4",
        className,
      )}
      data-slot="items-footer"
      {...props}
    >
      {children}
    </div>
  );
}

interface AddButtonProps {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

function AddButton({ children = "Додати елемент", ...props }: AddButtonProps) {
  const { setIsDialogOpen } = useItemsContainer();

  return (
    <Button
      onClick={() => setIsDialogOpen(true)}
      variant="default"
      data-slot="items-add-button"
      {...props}
    >
      <Plus size={16} />
      <span>{children}</span>
    </Button>
  );
}

interface ItemsDialogProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  noItemsMessage?: string;
}

function ItemsDialog({
  className,
  title = "Додавання елементу",
  description = "Виберіть елемент, який хочете додати",
  children,
  noItemsMessage = "Немає доступних елементів для додавання",
  ...props
}: ItemsDialogProps) {
  const { isDialogOpen, setIsDialogOpen } = useItemsContainer();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className={className} {...props}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mb-6">{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {children ? (
            <div className="flex max-h-64 flex-col gap-6 overflow-y-auto pr-2">
              {children}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-md border border-dashed p-8">
              <p className="text-muted-foreground italic">{noItemsMessage}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AvailableItemProps {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  onAddItem<T>(elementId?: T): void;
}

function AvailableItem({
  className,
  children,
  asChild = false,
  onAddItem,
  ...props
}: AvailableItemProps) {
  const Comp = asChild ? Slot : "button";

  const { setIsDialogOpen } = useItemsContainer();

  function hadnleAddItem() {
    onAddItem();
    setIsDialogOpen(false);
  }

  return (
    <Comp
      className={cn(
        "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex h-12 w-full items-center justify-between rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      data-slot="items-available-item"
      {...props}
    >
      {children}
      <Plus onClick={hadnleAddItem} size={16} />
    </Comp>
  );
}

interface SeparatorProps {
  className?: string;
}

function Separator({ className, ...props }: SeparatorProps) {
  return (
    <div
      className={cn("bg-border my-2 h-px w-full", className)}
      data-slot="items-separator"
      {...props}
    />
  );
}

ItemsContainer.Header = Header;
ItemsContainer.Title = Title;
ItemsContainer.Content = Content;
ItemsContainer.ItemsList = ItemsList;
ItemsContainer.Item = Item;
ItemsContainer.Footer = Footer;
ItemsContainer.AddButton = AddButton;
ItemsContainer.ItemsDialog = ItemsDialog;
ItemsContainer.Separator = Separator;
ItemsContainer.AvailableItem = AvailableItem;

export { ItemsContainer };
