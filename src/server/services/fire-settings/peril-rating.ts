import useSWR from "swr";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type PerilRateType = {
  id: number;
  fire_peril_class_id: number;
  fire_risk_class_id: number;
  rate: number;
  start_date: string;
  end_date: string;
  created_at: string;
};

export const read_fire_peril_rate = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/fire_peril_rates",
    fetcher
  );

  return {
    items: data ?? [],
    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};

export const create_fire_peril_rate = async (data: {
  data: {
    fire_risk_class_id: number;
    fire_peril_class_id: number;
    rate: number;
    start_date: string;
    end_date: string;
  };
}) => {
  try {
    const res = await API.post("/fire_peril_rates", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_fire_peril_rate = async (id: number) => {
  try {
    const res = await API.delete(`/fire_peril_rates/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_fire_peril_rate = async (
  id: number,
  data: {
    fire_peril_class_id: number;
    fire_risk_class_id: number;
    rate: number;
    start_date: string;
    end_date: string;
  }
) => {
  try {
    const res = await API.put(`/fire_peril_rates/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_fire_rate = async (id: number) => {
  try {
    const res = await API.get(`/fire_peril_rates/${id}`);
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
