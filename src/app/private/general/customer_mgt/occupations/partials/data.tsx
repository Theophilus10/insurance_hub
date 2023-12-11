import format from "date-fns/format";
import { IOccupation } from "./columns";

export const data: IOccupation[] = [
  {
    id: 1,
    code: "ID001",
    name: "Self Employed",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    code: "ID002",
    name: "Teacher",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
