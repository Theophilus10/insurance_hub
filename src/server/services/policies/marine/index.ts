import API from '@app/server/useAxios';
import { Policy } from '@app/types/severTypes';

export const createSingleTransitPolicy = async (data: Policy) => {
  try {
    const response = await API.post('/policies/', data);
    return response;
  } catch (error) {
    return error;
  }
};
