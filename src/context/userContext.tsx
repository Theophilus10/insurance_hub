import React from "react";

export interface IUser {
  fullName: string;
  id: number;
  firstName: string;
  surname: string;
  email: string;
  institution: string;
  institutionId: number;
  role: string;
  roleId: number;
  initials: string;
  profileImage: string;
}

const userContext = () => {
  const user: IUser = {
    id: 1,
    profileImage: "",
    fullName: "Kwakye Mensah",
    firstName: "Kwakye",
    surname: "Mensah",
    email: "kmensah@gmail.com",
    institution: "Activa International Insurance Company Limited",
    role: "Administrator",
    roleId: 1,
    institutionId: 1,
    initials: "KM",
  };
  const loading = false;
  return { user, loading };
};

export default userContext;
