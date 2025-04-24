import { createContext } from "react";

type ItemsContainerContextType = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export const ItemsContainerContext =
  createContext<ItemsContainerContextType | null>(null);
