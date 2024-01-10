import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export type IBank = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  code: string;
};

export const read_banks = () => {
  const { data, error, isLoading, mutate } = useSWR("/banks/all", fetcher);

  return {
    items: data
      ? data.map((x: IBank) => ({
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

export const create_bank = async (data: { name: string; code: string }) => {
  try {
    const res = await API.post("/banks/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_bank = async (id: number) => {
  try {
    const res = await API.delete(`/banks/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_bank = async (
  id: number,
  data: { name: string; code: string }
) => {
  try {
    const res = await API.put(`/banks/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_bank = async (id: number) => {
  try {
    const res = await API.get(`/banks/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
  // const { error, data, isLoading } = useSWR(
  //   `/banks/${id}`,
  //   fetcher
  // );
  // return {
  //   error,
  //   data,
  //   isLoading,
  //   success: data && true,
  // };
};
