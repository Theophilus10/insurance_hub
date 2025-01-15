import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";

export type IInstitutionType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  code: string;
};

export const read_institution_types = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/institution_types",
    fetcher
  );

  return {
    items: data
      ? data.institution_types.map((x: IInstitutionType) => ({
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

export const create_institution_type = async (data: { name: string }) => {
  try {
    const res = await API.post("/institution_types", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_instituition_type = async (id: number) => {
  try {
    const res = await API.delete(`/institution_types/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_institution_type = async (
  id: number,
  data: { name: string }
) => {
  try {
    const res = await API.put(`/institution_types/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_institution_type = async (id: number) => {
  try {
    const res = await API.get(`/institution_types/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
  // const { error, data, isLoading } = useSWR(
  //   `/institution-types/${id}`,
  //   fetcher
  // );
  // return {
  //   error,
  //   data,
  //   isLoading,
  //   success: data && true,
  // };
};
