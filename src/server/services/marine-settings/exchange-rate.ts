import useSWR from "swr";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";
import { ICurrency } from "..";

export type IExchangeRate = {
  id: number;
  rate: number;
  name: string;
  created_at: string;
  updated_at: string;
  currency: ICurrency;
};

export const read_exchange_rates = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "exchange-rates/all",
    fetcher
  );

  return {
    items: data
      ? data.map((x: IExchangeRate) => ({
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

export const create_exchange_rate = async (data: {
  rate: number;
  country_id: number;
}) => {
  try {
    const res = await API.post("exchange-rates/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_exchange_rate = async (id: number) => {
  try {
    const res = await API.delete(`exchange-rates/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_exchange_rate = async (
  id: number,
  data: { rate: number; country_id: number }
) => {
  try {
    const res = await API.put(`exchange-rates/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_exchange_rate = async (id: number) => {
  try {
    const res = await API.get(`exchange-rates/${id}`);
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
