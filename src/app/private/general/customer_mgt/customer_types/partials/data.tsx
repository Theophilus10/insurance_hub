import format from "date-fns/format";
import { ICustomerType } from "./columns";

export const data: ICustomerType[] = [
  {
    id: 1,
    code: "CT001",
    name: "Individual",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    code: "CT002",
    name: "Business",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
