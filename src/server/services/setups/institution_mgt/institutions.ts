import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import API from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";
import { IInstitutionType } from "./instituiton-types";

export interface InstitutionDTO {
  institution_type_id: number;
  name: string;
  parent_institution_id?: number;
  contact_person?: string;
  position_of_person?: string;
  contact_phone?: string;
  business_address?: string;
  email?: string;
  office_location?: string;
  website?: string;
  is_insurance_company: boolean;
}

export interface IInstitution {
  id: number;
  code: string;
  name: string;
  contact_person: string;
  position_of_person: string;
  contact_phone: string;
  business_address: string;
  email: string;
  office_location: string;
  website: string;
  created_at: string;
  updated_at: string;
  institution_type: IInstitutionType;
  is_insurance_company: boolean;
  parent_institution?: IInstitution;
}
export const read_institutions = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/institutions/all",
    fetcher
  );

  return {
    items: data
      ? data.map((x: IInstitution) => ({
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

export const create_institution = async (data: InstitutionDTO) => {
  try {
    const res = await API.post("/institutions/", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_instituition = async (id: number) => {
  try {
    const res = await API.delete(`/institutions/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_institution = async (id: number, data: InstitutionDTO) => {
  try {
    const res = await API.put(`/institutions/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_institution = async (id: number) => {
  try {
    const res = await API.get(`/institution/${id}`);
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
