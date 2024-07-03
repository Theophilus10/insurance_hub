import { fetcher } from "@app/server/shared";
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
