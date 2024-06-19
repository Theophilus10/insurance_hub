import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export type IFinancialInterest = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  code: string;
};

export const read_financial_interests = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/financial-interests/all",
    fetcher
  );

  return {
    items: data
      ? data.map((x: IFinancialInterest) => ({
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

export const create_financial_interes = async (data: { name: string }) => {
  try {
    const res = await API.post("/financial-interests/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_financial_interes = async (id: number) => {
  try {
    const res = await API.delete(`/financial-interests/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_financial_interes = async (
  id: number,
  data: { name: string }
) => {
  try {
    const res = await API.put(`/financial-interests/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_financial_interes = async (id: number) => {
  try {
    const res = await API.get(`/financial-interests/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
  // const { error, data, isLoading } = useSWR(
  //   `/financial-interests/${id}`,
  //   fetcher
  // );
  // return {
  //   error,
  //   data,
  //   isLoading,
  //   success: data && true,
  // };
};
