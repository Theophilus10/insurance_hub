import format from "date-fns/format";
import { ICustomerCategory } from "./columns";

export const data: ICustomerCategory[] = [
  {
    id: 1,
    code: "CC001",
    name: "Citizen",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    code: "CC002",
    name: "Non-citizen",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
