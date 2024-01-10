import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";
import { IRole } from ".";
import { IBranch } from "..";

export interface IUser {
  id: string;
  branch_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_phone: string;
  created_at: string;
  last_logged_in: string;
  last_login_attempt: string;
  branch: IBranch;
  role: IRole;
}

export interface UserDTO {
  first_name: string;
  last_name: string;
  email: string;
  contact_phone: string;
}

export const read_users = () => {
  const { data, error, isLoading, mutate } = useSWR("/users/all", fetcher);

  return {
    items: data
      ? data.map((x: IUser) => ({
          ...x,
          created_at: format(new Date(x.created_at), "dd MMMM yyy"),
        }))
      : [],
    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};

export const create_user = async (data: UserDTO) => {
  try {
    const res = await API.post("/users/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_user = async (id: number) => {
  try {
    const res = await API.delete(`/users/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_user = async (id: number, data: UserDTO) => {
  try {
    const res = await API.put(`/users/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_user = async (id: number) => {
  try {
    const res = await API.get(`/users/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
