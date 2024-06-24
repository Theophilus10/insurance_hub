import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export type ICountry = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  code: string;
};

export const read_countries = () => {
  const { data, error, isLoading, mutate } = useSWR("/countries", fetcher);
  console.log(data, "data");
  return {
    items: data
      ? data?.countries.map((x: ICountry) => ({
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

export const create_country = async (data: { name: string; code: string }) => {
  try {
    const res = await API.post("/countries", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_country = async (id: number) => {
  try {
    const res = await API.delete(`/countries/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_country = async (
  id: number,
  data: { name: string; code: string }
) => {
  try {
    const res = await API.put(`/countries/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_country = async (id: number) => {
  try {
    const res = await API.get(`/countries/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
  // const { error, data, isLoading } = useSWR(
  //   `/countries/${id}`,
  //   fetcher
  // );
  // return {
  //   error,
  //   data,
  //   isLoading,
  //   success: data && true,
  // };
};
