import useSWR from "swr";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type RiskClassType = {
  id: number;
  code: string;
  description: string;
  min_amount: number;
  max_amount: number;
  fire_rate: string;
  collapse_rate: string;
  public_liability_rate: string;
  start_date: string;
  end_date: string;
  created_at: string;
};

export const read_fire_risk_class = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/fire_risk_classes",
    fetcher
  );

  return {
    items: data
      ? data?.fire_risk_classes?.map((x: RiskClassType) => ({
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

export const create_fire_risk_class = async (data: {
  data: {
    code: string;
    description: string;
    min_amount: number;
    max_amount: number;
    fire_rate: string;
    collapse_rate: string;
    public_liability_rate: string;
    start_date: string;
    end_date: string;
  };
}) => {
  try {
    const res = await API.post("/fire_risk_classes", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_fire_risk_class = async (id: number) => {
  try {
    const res = await API.delete(`/fire_risk_classes/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_fire_risk_class = async (
  id: number,
  data: {
    code: string;
    description: string;
    min_amount: number;
    max_amount: number;
    fire_rate: string;
    collapse_rate: string;
    public_liability_rate: string;
    start_date: string;
    end_date: string;
  }
) => {
  try {
    const res = await API.put(`/fire_risk_classes/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_risk_class = async (id: number) => {
  try {
    const res = await API.get(`/fire_risk_classes/${id}`);
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
