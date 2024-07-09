import useSWR from "swr";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type PerilExcessType = {
  id: number;
  fire_excess_id: number;
  fire_risk_class_id: number;
  rate: number;
  start_date: string;
  end_date: string;
  created_at: string;
};

export const read_fire_excess_rate = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/fire_excess_rates",
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

export const create_fire_excess_rate = async (data: {
  data: {
    fire_risk_class_id: number;
    fire_excess_id: number;
    rate: number;
    start_date: string;
    end_date: string;
  };
}) => {
  try {
    const res = await API.post("/fire_excess_rates", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_fire_excess_rate = async (id: number) => {
  try {
    const res = await API.delete(`/fire_excess_rates/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_fire_excess_rate = async (
  id: number,
  data: {
    fire_excess_id: number;
    fire_risk_class_id: number;
    rate: number;
    start_date: string;
    end_date: string;
  }
) => {
  try {
    const res = await API.put(`/fire_excess_rates/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_excess_rate = async (id: number) => {
  try {
    const res = await API.get(`/fire_excess_rates/${id}`);
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
