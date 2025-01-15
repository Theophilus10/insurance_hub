import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export interface IIdentificationType {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export const read_identification_types = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/identification_types",
    fetcher
  );

  return {
    items: data
      ? data?.identification_types.map((x: IIdentificationType) => ({
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

export const create_identification_type = async (data: { name: string }) => {
  try {
    const res = await API.post("/identification_types/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_identification_type = async (id: number) => {
  try {
    const res = await API.delete(`/identification_types/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_identification_type = async (
  id: number,
  data: { name: string }
) => {
  try {
    const res = await API.put(`/identification_types/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_identification_type = async (id: number) => {
  try {
    const res = await API.get(`/identification_types/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
