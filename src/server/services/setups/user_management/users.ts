import { API } from "@app/server/useAxios";
import { axiosError, callResult } from "@app/server/shared";
import useSWR from "swr";
import { fetcher } from "@app/server/shared";
import { format } from "date-fns";

export interface Users {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  institution_id: number;
  institution_type_id: number;
  branch_id: number;
  region: string;
  created_at: string;
  updated_at: string;
}

export interface UsersData {
  name: string;
  email: string;
  phone: string;
  role: string;
  institution_id: number;
  institution_type_id: number;
  branch_id: number;
  region: string;
}

export interface Roles {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export const read_users = () => {
  const { data, error, isLoading, mutate } = useSWR("/users", fetcher);

  return {
    items: data
      ? data?.users.map((x: Users) => ({
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

export const register_user = async (data: UsersData) => {
  try {
    const res = await API.post("/users", data);

    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_roles = () => {
  const { data, error, isLoading, mutate } = useSWR("/roles", fetcher);

  return {
    items: data
      ? data?.roles.map((x: Roles) => ({
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

// export const update_role = async (id: number, data: UsersData) => {
//   try {
//     const res = await axios.put(`/roles/${id}`, data);
//     return callResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
// };

// export const delete_role = async (id: number) => {
//   try {
//     const res = await axios.delete(`/roles/${id}`);

//     return callResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
// };
