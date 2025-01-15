import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export interface ICustomerCategory {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export const read_customer_categories = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/customer_categories",
    fetcher
  );

  return {
    items: data
      ? data.customer_categories.map((x: ICustomerCategory) => ({
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

export const create_customer_category = async (data: { name: string }) => {
  try {
    const res = await API.post("/customer_categories", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_customer_category = async (id: number) => {
  try {
    const res = await API.delete(`/customer_categories/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_customer_category = async (
  id: number,
  data: { name: string }
) => {
  try {
    const res = await API.put(`/customer_categories/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_customer_category = async (id: number) => {
  try {
    const res = await API.get(`/customer_categories/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
