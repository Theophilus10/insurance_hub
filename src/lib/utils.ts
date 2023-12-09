import { IMenuItem } from "@app/types/appTypes";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findMenuParent(
  selectedItem: IMenuItem,
  data: IMenuItem[]
): string[] | null {
  function findParentsRecursive(
    category: IMenuItem,
    categories: IMenuItem[]
  ): string[] | null {
    for (const item of categories) {
      if (item === category) {
        return [item.title];
      } else if (item.items) {
        const parents = findParentsRecursive(category, item.items);
        if (parents) {
          return [item.title, ...parents];
        }
      }
    }
    return null;
  }

  const parentStack = findParentsRecursive(selectedItem, data);

  return parentStack;
}

export const convertParam = (
  value: string | null | string[],
  selectedDates?: string[] | null | Date[],
  name?: string
) => ({
  target: { value, name, selectedDates },
});
