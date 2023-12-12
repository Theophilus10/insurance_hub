import format from "date-fns/format";
import { IInstitutionType } from "./columns";

export const data: IInstitutionType[] = [
  {
    id: 1,
    name: "Service Provider",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    name: "Commission",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 3,
    name: "Insurance Company",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 4,
    name: "Broker",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
