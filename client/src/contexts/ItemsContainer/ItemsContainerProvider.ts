import { useContext } from "react";
import { ItemsContainerContext } from "./ItemsContainerContext";

export function useItemsContainer() {
  const context = useContext(ItemsContainerContext);
  if (!context) {
    throw new Error("useItemsContainer must be used within ItemsProvider");
  }
  return context;
}
