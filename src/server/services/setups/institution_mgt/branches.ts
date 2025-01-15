import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";
import { IInstitution } from ".";

export interface IBranch {
  id: number;
  code: string;
  name: string;
  contact_person: string;
  region: string;
  position_of_person: string;
  contact_phone: string;
  business_address: string;
  email: string;
  office_location: string;
  created_at: string;
  updated_at: string;
  institution: IInstitution;
}

export interface BranchDTO {
  institution_id: number;
  name: string;
  contact_person: string;
  region: string;
  position_of_person: string;
  contact_phone: string;
  email: string;
  office_location: string;
}

export const read_branches = () => {
  const { data, error, isLoading, mutate } = useSWR("/branches", fetcher);

  return {
    items: data
      ? data.map((x: IBranch) => ({
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

export const create_branch = async (data: BranchDTO) => {
  try {
    const res = await API.post("/branches", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_branch = async (id: number) => {
  try {
    const res = await API.delete(`/branches/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_branch = async (id: number, data: BranchDTO) => {
  try {
    const res = await API.put(`/branches/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_branch = async (id: number) => {
  try {
    const res = await API.get(`/branches/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
