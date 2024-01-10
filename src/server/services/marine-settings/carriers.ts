import useSWR from "swr";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";
import { IShippingType } from "..";

export type ICarrier = {
  id: number;
  code: string;
  name: string;
  shipping_type: IShippingType;
  created_at: string;
  updated_at: string;
};

export const read_carriers = () => {
  const { data, error, isLoading, mutate } = useSWR("carriers/all", fetcher);

  return {
    items: data
      ? data.map((x: ICarrier) => ({
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

export const create_carrier = async (data: {
  name: string;
  code: string;
  shipping_type_id: number;
}) => {
  try {
    const res = await API.post("carriers/", data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_carrier = async (id: number) => {
  try {
    const res = await API.delete(`carriers/${id}`);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_carrier = async (
  id: number,
  data: {
    name: string;
    code: string;
    shipping_type_id: number;
  }
) => {
  try {
    const res = await API.put(`carriers/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_carrier = async (id: number) => {
  try {
    const res = await API.get(`carriers/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
