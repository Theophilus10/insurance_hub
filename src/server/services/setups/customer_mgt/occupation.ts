import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export interface IOccupation {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export const read_occupations = () => {
  const { data, error, isLoading, mutate } = useSWR("/occupations", fetcher);

  return {
    items: data
      ? data?.occupations.map((x: IOccupation) => ({
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

export const create_occupation = async (data: {
  name: string;
  code: string;
}) => {
  try {
    const res = await API.post("/occupations", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_occupation = async (id: number) => {
  try {
    const res = await API.delete(`/occupations/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_occupation = async (
  id: number,
  data: { name: string; code: string }
) => {
  try {
    const res = await API.put(`/occupations/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_occupation = async (id: number) => {
  try {
    const res = await API.get(`/occupations/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
