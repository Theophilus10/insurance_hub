import useSWR from "swr";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type IShippingType = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const read_shipping_types = () => {
  const { data, error, isLoading, mutate } = useSWR("shipping_types", fetcher);

  return {
    items: data
      ? data.shipping_types.map((x: IShippingType) => ({
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

export const create_shipping_type = async (data: {
  name: string;
  code: string;
}) => {
  try {
    const res = await API.post("shipping_types", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_shipping_type = async (id: number) => {
  try {
    const res = await API.delete(`shipping_types/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_shipping_type = async (
  id: number,
  data: { name: string; code: string }
) => {
  try {
    const res = await API.put(`shipping_types/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_shipping_type = async (id: number) => {
  try {
    const res = await API.get(`shipping_types/${id}`);
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
