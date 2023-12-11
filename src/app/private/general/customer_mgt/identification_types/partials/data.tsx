import format from "date-fns/format";
import { IIdentificationType } from "./columns";

export const data: IIdentificationType[] = [
  {
    id: 1,
    code: "ID001",
    name: "National ID",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    code: "ID002",
    name: "TIN",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
