import useSWR from "swr";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type IDiscountRate = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const read_discount_rates = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/discount-rates/all",
    fetcher
  );

  return {
    items: data
      ? data.map((x: IDiscountRate) => ({
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

export const create_discount_rate = async (data: {
  discount_id: number;
  rate: number;
  start_date: string;
  end_date: string;
}) => {
  try {
    const res = await API.post("/discount-rates/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_discount_rate = async (id: number) => {
  try {
    const res = await API.delete(`/discount-rates/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_discount_rate = async (
  id: number,
  data: {
    discount_id: number;
    rate: number;
    start_date: string;
    end_date: string;
  }
) => {
  try {
    const res = await API.put(`/discount-rates/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_discount_rate = async (id: number) => {
  try {
    const res = await API.get(`/discount-rates/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
