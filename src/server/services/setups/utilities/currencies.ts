import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export type ICurrency = {
  id: number;
  code: string;
  name: string;
  is_base: boolean;
  created_at: string;
  updated_at: string;
};

export const read_currencies = () => {
  const { data, error, isLoading, mutate } = useSWR("/currencies/all", fetcher);

  return {
    items: data
      ? data.map((x: ICurrency) => ({
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

export const create_currency = async (data: {
  name: string;
  code: string;
  is_base: boolean;
}) => {
  try {
    const res = await API.post("/currencies/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_currency = async (id: number) => {
  try {
    const res = await API.delete(`/currencies/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_currency = async (
  id: number,
  data: { name: string; code: string; is_base: boolean }
) => {
  try {
    const res = await API.put(`/currencies/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_currency = async (id: number) => {
  try {
    const res = await API.get(`/currencies/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
  // const { error, data, isLoading } = useSWR(
  //   `/currencies/${id}`,
  //   fetcher
  // );
  // return {
  //   error,
  //   data,
  //   isLoading,
  //   success: data && true,
  // };
};
