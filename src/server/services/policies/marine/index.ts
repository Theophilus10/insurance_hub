import { axiosError, callResult, fetcher } from "@app/server/shared";
import { API } from "@app/server/useAxios";
import { OpenCoverPolicy, Policy } from "@app/types/severTypes";
import useSWR from "swr";

export const createSingleTransitPolicy = async (data: Policy) => {
  try {
    const response = await API.post("/policies", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createOpenCoverPolicy = async (data: OpenCoverPolicy) => {
  try {
    const response = await API.post("/open_cover_policies", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const read_policy_pending = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/policies/pending_policies",
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

export const show_policy = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(`/policies/${id}`, fetcher);

  return {
    items: data ? data : [],
    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};

export const read_policy_approve = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/policies/active_policies",
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

export const approve_policy = async (id: number) => {
  try {
    const res = await API.patch(`/policies/${id}/approve`);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const cancel_policy = async (
  id: number,
  cancellation_reason: string
) => {
  try {
    const res = await API.patch(`/policies/${id}/cancel`, {
      cancellation_reason,
    });
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_policy_cancelled = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/policies/cancelled_policies",
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
