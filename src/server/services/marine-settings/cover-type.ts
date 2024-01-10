import useSWR from "swr";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";

export type ICoverType = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export const read_cover_types = () => {
  const { data, error, isLoading, mutate } = useSWR("cover-types/all", fetcher);

  return {
    items: data
      ? data.map((x: ICoverType) => ({
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

export const create_cover_type = async (data: {
  name: string;
  code: string;
}) => {
  try {
    const res = await API.post("cover-types/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    // console.log(err);

    return axiosError(err);
  }
};

export const delete_cover_type = async (id: number) => {
  try {
    const res = await API.delete(`cover-types/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_cover_type = async (
  id: number,
  data: { name: string; code: string }
) => {
  try {
    const res = await API.put(`cover-types/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_cover_type = async (id: number) => {
  try {
    const res = await API.get(`cover-types/${id}`);
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
