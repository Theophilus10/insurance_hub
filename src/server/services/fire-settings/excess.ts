import useSWR from "swr";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type IExcess = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const read_excesses = () => {
  const { data, error, isLoading, mutate } = useSWR("/fire_excesses", fetcher);

  return {
    items: data
      ? data?.fire_excesses?.map((x: IExcess) => ({
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

export const create_excess = async (data: { code: string; name: string }) => {
  try {
    const res = await API.post("/fire_excesses", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_excess = async (id: number) => {
  try {
    const res = await API.delete(`/fire_excesses/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_excess = async (
  id: number,
  data: {
    name: string;
    code: string;
  }
) => {
  try {
    const res = await API.put(`/fire_excesses/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_excess = async (id: number) => {
  try {
    const res = await API.get(`/fire_excesses/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
  // const { error, data, isLoading } = useSWR(
  //   `/ratings/${id}`,
  //   fetcher
  // );
  // return {
  //   error,
  //   data,
  //   isLoading,
  //   success: data && true,
  // };
};
