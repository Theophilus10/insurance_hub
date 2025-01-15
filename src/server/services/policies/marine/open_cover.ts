import {
  axiosError,
  callResult,
  fetcher,
  queryResult,
} from "@app/server/shared";
import API from "@app/server/useAxios";
import useSWR from "swr";

export const read_open_cover_policy = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/open_cover_policies",
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

export const patchOpenCoverPolicy = async (id: number, data: any) => {
  try {
    const res = await API.put(`/open_cover_policies/${id}`, data);
    return callResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const showOpenCoverPolicy = async (id: number) => {
  try {
    const res = await API.get(`/open_cover_policies/${id}`);
    return queryResult(res, res.data);
  } catch (err) {
    return axiosError(err);
  }
};

export const read_open_cover_policy_in_progress = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/open_cover_policies/in_progress_open_cover_policies",
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
