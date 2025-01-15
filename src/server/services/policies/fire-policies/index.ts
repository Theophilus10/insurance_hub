import { axiosError, callResult, fetcher } from "@app/server/shared";
import { API } from "@app/server/useAxios";
import { FirePolicy } from "@app/types/policyTypes";
import { OpenCoverPolicy, Policy } from "@app/types/severTypes";
import useSWR from "swr";

export const createFirePolicy = async (data: FirePolicy) => {
  try {
    const response = await API.post("/fire_policies", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const read_fire_policy_pending = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/fire_policies/fire_pending_policies",
    fetcher
  );
  console.log(data, "data");
  return {
    items: data ?? [],

    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};

export const show_fire_policy = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/fire_policies/${id}`,
    fetcher
  );

  return {
    items: data ? data : [],
    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};

export const read_fire_policy_approve = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/fire_policies/fire_active_policies",
    fetcher
  );
  console.log(data, "data");
  return {
    items: data ?? [],

    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};

export const approve_fire_policy = async (id: number) => {
  try {
    const res = await API.patch(`/fire_policies/${id}/approve`);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const cancel_fire_policy = async (
  id: number,
  cancellation_reason: string
) => {
  try {
    const res = await API.patch(`/fire_policies/${id}/cancel`, {
      cancellation_reason,
    });
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_fire_policy_cancelled = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/fire_policies/fire_cancelled_policies",
    fetcher
  );
  console.log(data, "data");
  return {
    items: data ?? [],

    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};
