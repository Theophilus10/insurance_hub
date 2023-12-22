import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export interface IPermission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export const read_permissions = (page = 1) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/permissions/all?page=${page}`,
    fetcher
  );

  return {
    items: data
      ? data.map((x: IPermission) => ({
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

export const create_permission = async (data: { name: string }) => {
  try {
    const res = await API.post("/permissions/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_permission = async (id: number) => {
  try {
    const res = await API.delete(`/permissions/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_permission = async (id: number, data: { name: string }) => {
  try {
    const res = await API.put(`/permissions/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_permission = async (id: number) => {
  try {
    const res = await API.get(`/permissions/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
