import { AxiosResponse } from 'axios';
import api from './useAxios';

export const fetcher = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

interface INoDataCallResult {
  success: boolean;
  message?: string;
}

interface IFailureResult {
  success: false;
  message: string;
}

interface IOk {
  success: true;
  message: string;
}
interface IOkResult<T> {
  success: true;
  message: string;
  data: T;
}

export function callResult<R>(rawResponse: AxiosResponse<R>, result: any) {
  if (rawResponse.status >= 400) {
    return <IFailureResult>{
      success: false,
      message: `Request failed with status ${rawResponse.status}: ${rawResponse.statusText}`,
    };
  }

  if (!result) {
    return <IFailureResult>{
      success: false,
      message: 'No valid response was received',
    };
  }

  return <IOk>{ success: true, message: result.message || '' };
}

export function axiosError(response: any): IFailureResult {
  if (response.status >= 200 && response.status < 300) {
    // Successful response, return success: true
    return { success: false, message: 'Success' };
  } else {
    // Handle error response
    const errorMessage =
      (response.data && response.data.message) ||
      (response.statusText && response.statusText) ||
      (response.data &&
        response.detail &&
        response.detail.map((x: any) => x.msg).join(' , ')) ||
      response.message;
    ('Unknown error');

    return { success: false, message: errorMessage };
  }
}

export function queryResult<R, T>(
  rawResponse: any,
  data: T
): IFailureResult | IOkResult<NonNullable<T>> {
  if (rawResponse.errors) {
    return {
      success: false,
      message: rawResponse.errors.map((x: any) => x.message).join('.\n'),
    };
  }

  return { success: true, message: '', data: data as NonNullable<T> };
}
