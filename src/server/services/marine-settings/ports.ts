import useSWR from "swr";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";
import { ICountry, IShippingType } from "..";

export type IPort = {
  id: number;
  code: string;
  name: string;
  country: ICountry;
  shipping_type: IShippingType;
  created_at: string;
  updated_at: string;
};

export const read_ports = () => {
  const { data, error, isLoading, mutate } = useSWR("ports/all", fetcher);

  return {
    items: data
      ? data.map((x: IPort) => ({
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

export const create_port = async (data: {
  name: string;
  code: string;
  country_id: number;
  shipping_type_id: number;
}) => {
  try {
    const res = await API.post("ports/", data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_port = async (id: number) => {
  try {
    const res = await API.delete(`ports/${id}`);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_port = async (
  id: number,
  data: {
    name: string;
    code: string;
    country_id: number;
    shipping_type_id: number;
  }
) => {
  try {
    const res = await API.put(`ports/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_port = async (id: number) => {
  try {
    const res = await API.get(`ports/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_port_select = async () => {
  try {
    const res = await API.get(`ports/allforselect`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
