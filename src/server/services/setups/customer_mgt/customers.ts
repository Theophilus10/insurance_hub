import useSWR from "swr";
import { fetcher } from "../../../shared";
import { format } from "date-fns";
import { API } from "@app/server/useAxios";
import { axiosError, callResult, queryResult } from "@app/server/shared";
import {
  ICustomerCategory,
  ICustomerType,
  IIdentificationType,
  IOccupation,
} from ".";

export interface ICustomer {
  id: number;
  name: string;
  identification_type: IIdentificationType;
  identification_number: string;
  tax_id_number: string;
  reference: string;
  customer_type: ICustomerType;
  customer_category: ICustomerCategory;
  email: string;
  phone: string;
  digital_address: string;
  postal_address: string;
  residential_address: string;
  occupation: IOccupation;
  created_at: string;
  updated_at: string;
}

export interface CustomerDTO {
  name: string;
  identification_type_id: number;
  identification_number: string;
  tax_id_number: string;
  customer_type_id: number;
  customer_category_id: number;
  email: string;
  phone: string;
  digital_address: string;
  postal_address: string;
  residential_address: string;
  occupation_id: number;
}

export const read_customers = () => {
  const { data, error, isLoading, mutate } = useSWR("/customers", fetcher);

  return {
    items: data
      ? data?.map((x: ICustomer) => ({
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

export const create_customer = async (data: CustomerDTO) => {
  try {
    const res = await API.post("/customers", data);
    // console.log(res);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const delete_customer = async (id: number) => {
  try {
    const res = await API.delete(`/customers/${id}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const update_customer = async (id: number, data: CustomerDTO) => {
  try {
    const res = await API.put(`/customers/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_customer = async (id: number) => {
  try {
    const res = await API.get(`/customers/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export interface CustomerParams {
  email?: string;
  phone?: string;
  identification_number?: string;
}

export const find_customer = async (identifier: string) => {
  try {
    const res = await API.get(`/customers/find`, {
      params: { query: identifier },
    });
    return queryResult(res, res.data); // Assuming queryResult and axiosError are defined
  } catch (err) {
    return axiosError(err);
  }
};
