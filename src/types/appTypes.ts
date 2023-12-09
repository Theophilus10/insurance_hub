export interface IMenuItem {
  title: string;
  icon?: string;
  path?: string;
  items?: IMenuItem[] | null;
  iconBg?: string;
  iconColor?: string;
  description?: string;
  handler?: (_: IMenuItem) => void;
}

export type ContentSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
