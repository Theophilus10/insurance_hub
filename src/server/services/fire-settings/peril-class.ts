import useSWR from "swr";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type IExcess = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const read_fire_peril_class = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/fire_peril_classes",
    fetcher
  );

  return {
    items: data
      ? data?.fire_peril_classes?.map((x: IExcess) => ({
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

export const create_fire_peril_class = async (data: {
  code: string;
  name: string;
}) => {
  try {
    const res = await API.post("/fire_peril_classes", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_fire_peril_class = async (id: number) => {
  try {
    const res = await API.delete(`/fire_peril_classes/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_fire_peril_class = async (
  id: number,
  data: {
    name: string;
    code: string;
  }
) => {
  try {
    const res = await API.put(`/fire_peril_classes/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_peril_class = async (id: number) => {
  try {
    const res = await API.get(`/fire_peril_classes/${id}`);
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
