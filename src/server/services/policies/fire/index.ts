/* eslint-disable react-hooks/rules-of-hooks */
import API from '@app/server/useAxios';
import useSWR from 'swr';
import { format } from 'date-fns';
import { fetcher } from '@app/server/shared';
import { FirePolicy } from '@app/types/severTypes';

export const createFirePolicy = async (data: FirePolicy) => {
  try {
    const response = await API.post('/policies/fire/', data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getFirePolicies = () => {
  const { data, error, isLoading, mutate } = useSWR(
    'policies/fire/all?limit=10&page=1',
    fetcher
  );

  return {
    items: data
      ? data.map((x: any) => ({
          ...x,
          created_at: format(new Date(), 'dd MMMM yyy'),
        }))
      : [],
    isLoading,
    isError: error,
    mutate,
    success: data && true,
  };
};
