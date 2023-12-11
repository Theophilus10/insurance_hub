import React from "react";

export interface IUser {
  full_name: string;
  id: number;
  first_name: string;
  surname: string;
  email: string;
  institution: string;
  institution_Id: number;
  branch?: string;
  branch_id?: number;
  role: string;
  role_Id: number;
  initials: string;
  profileImage?: string;
  created_at?: string;
  contact_phone?: string;
}

const userContext = () => {
  const user: IUser = {
    id: 1,
    profileImage: "",
    full_name: "Kwakye Mensah",
    first_name: "Kwakye",
    surname: "Mensah",
    email: "kmensah@gmail.com",
    institution: "Activa International Insurance Company Limited",
    role: "Administrator",
    role_Id: 1,
    institution_Id: 1,
    initials: "KM",
  };
  const loading = false;
  return { user, loading };
};

export default userContext;
