import useSWR from "swr";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type IInterest = {
  id: number;
  code: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const read_interests = () => {
  const { data, error, isLoading, mutate } = useSWR("interests", fetcher);

  return {
    items: data
      ? data.interests.map((x: IInterest) => ({
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

export const create_interest = async (data: {
  name: string;
  code: string;
  description: string;
}) => {
  try {
    const res = await API.post("interests", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_interest = async (id: number) => {
  try {
    const res = await API.delete(`interests/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_interest = async (
  id: number,
  data: { name: string; code: string; description: string }
) => {
  try {
    const res = await API.put(`interests/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_interest = async (id: number) => {
  try {
    const res = await API.get(`interests/${id}`);
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
