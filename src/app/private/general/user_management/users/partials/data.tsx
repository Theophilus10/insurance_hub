import { IUser } from "@app/context/userContext";
import format from "date-fns/format";

export const data: IUser[] = [
  {
    id: 1,
    full_name: "Akua Dankwah",
    first_name: "Akua",
    surname: "Dankwah",
    email: "aadankwah27@gmail.com",
    institution: "Ecfatum",
    institution_Id: 1,
    role: "Administrator",
    branch: "Head Office",
    contact_phone: '2335012345678',
    branch_id: 1,
    role_Id: 1,
    initials: "AD",
    profileImage: "",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    full_name: "Alexander Odom",
    first_name: "Akua",
    surname: "Dankwah",
    email: "aaodoom@gmail.com",
    institution: "Ecfatum",
    institution_Id: 1,
    role: "Administrator",
    branch: "Head Office",
    contact_phone: '2335012345678',
    branch_id: 1,
    role_Id: 1,
    initials: "AO",
    profileImage: "",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
