import useSWR from "swr";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type IDiscount = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const read_discounts = () => {
  const { data, error, isLoading, mutate } = useSWR("/discounts/all", fetcher);

  return {
    items: data
      ? data.map((x: IDiscount) => ({
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

export const create_discount = async (data: { code: string; name: string }) => {
  try {
    const res = await API.post("/discounts/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_discount = async (id: number) => {
  try {
    const res = await API.delete(`/discounts/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_discount = async (
  id: number,
  data: {
    name: string;
    code: string;
  }
) => {
  try {
    const res = await API.put(`/discounts/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_discount = async (id: number) => {
  try {
    const res = await API.get(`/discounts/${id}`);
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
