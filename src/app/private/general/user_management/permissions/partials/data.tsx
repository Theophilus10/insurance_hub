import format from "date-fns/format";
import { IPermission } from "./columns";

export const data: IPermission[] = [
  {
    id: 1,
    name: 'Create Policy',
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
