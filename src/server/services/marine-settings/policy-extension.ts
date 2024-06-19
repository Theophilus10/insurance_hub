import useSWR from "swr";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type IPolicyExtension = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const read_policy_extensions = () => {
  const { data, error, isLoading, mutate } = useSWR("extensions/all", fetcher);

  return {
    items: data
      ? data.map((x: IPolicyExtension) => ({
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

export const create_policy_extension = async (data: { name: string }) => {
  try {
    const res = await API.post("extensions/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_policy_extension = async (id: number) => {
  try {
    const res = await API.delete(`extensions/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_policy_extension = async (
  id: number,
  data: { name: string }
) => {
  try {
    const res = await API.put(`extensions/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_policy_extension = async (id: number) => {
  try {
    const res = await API.get(`extensions/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
  // const { error, data, isLoading } = useSWR(
  //   `/interests/${id}`,
  //   fetcher
  // );
  // return {
  //   error,
  //   data,
  //   isLoading,
  //   success: data && true,
  // };
};
