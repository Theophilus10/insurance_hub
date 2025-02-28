import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";
import API from "@app/server/useAxios";
import { OpenCoverPolicy, Policy } from "@app/types/severTypes";
import useSWR from "swr";

export const createSingleTransitPolicy = async (data: Policy) => {
  try {
    console.log("making api call");
    const response = await API.post("/policies", data);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const patchSingleTransitPolicy = async (id: number, data: Policy) => {
  try {
    const res = await API.put(`/policies/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const showSingleTransitPolicy = async (id: number) => {
  try {
    const res = await API.get(`/policies/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
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

export const read_policy_in_progress = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/policies/in_progress_policies",
    fetcher
  );
  console.log(data, "data in progress");
  return {
    items: data ?? [],

    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};

export const read_policy_pending = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/policies/pending_policies",
    fetcher
  );

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

  return {
    items: data ?? [],

    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};

export const delete_upload = async (docId: number) => {
  try {
    const res = await API.delete(`/delete_document/${docId}`);
    // console.log(res)
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};
