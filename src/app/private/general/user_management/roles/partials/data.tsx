import format from "date-fns/format";
import { IRole } from "./columns";

export const data: IRole[] = [
  {
    id: 1,
    name: "Underwriting",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    name: "Administrator",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 3,
    name: "Viewer",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
