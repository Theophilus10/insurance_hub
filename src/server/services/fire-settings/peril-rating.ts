// import useSWR from "swr";
// import { format } from "date-fns";
// import API from "@app/server/useAxios";
// import {
//   axiosError,
//   callResult,
//   fetcher,
//   queryResult,
// } from "@app/server/shared";
// import { ICoverType, IInterest } from ".";

// export type IRating = {
//   id: number;
//   cover_type: ICoverType;
//   interest: IInterest;
//   containerized_rate: 0;
//   non_containerized_rate: 0;
//   exclusions: string;
//   remarks: string;
//   start_date: string;
//   end_date: string;
//   created_at: string;
//   updated_at: string;
// };

// export const read_ratings = () => {
//   const { data, error, isLoading, mutate } = useSWR("/ratings/all", fetcher);

//   return {
//     items: data
//       ? data.map((x: IRating) => ({
//           ...x,
//           created_at: format(new Date(x.created_at), "dd MMMM yyy"),
//         }))
//       : [],
//     isLoading,
//     isError: error,
//     mutate,
//     success: data && true,
//   };
// };

// export const create_rating = async (data: {
//   cover_type_id: number;
//   interest_id: number;
//   containerized_rate: number;
//   non_containerized_rate: number;
//   exclusions: string;
//   remarks: string;
//   start_date: string;
//   end_date: string;
// }) => {
//   try {
//     const res = await API.post("/ratings/", data);
//     // console.log(res);
//     return callResult(res, res.data);
//   } catch (err) {
//     // console.log(err);

//     return axiosError(err);
//   }
// };

// export const delete_rating = async (id: number) => {
//   try {
//     const res = await API.delete(`/ratings/${id}`);
//     // console.log(res)
//     return callResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
// };

// export const update_rating = async (
//   id: number,
//   data: {
//     cover_type_id: number;
//     interest_id: number;
//     containerized_rate: number;
//     non_containerized_rate: number;
//     exclusions: string;
//     remarks: string;
//     start_date: string;
//     end_date: string;
//   }
// ) => {
//   try {
//     const res = await API.put(`/ratings/${id}`, data);
//     return callResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
// };

// export const read_rating = async (id: number) => {
//   try {
//     const res = await API.get(`/ratings/${id}`);
//     return queryResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
//   // const { error, data, isLoading } = useSWR(
//   //   `/ratings/${id}`,
//   //   fetcher
//   // );
//   // return {
//   //   error,
//   //   data,
//   //   isLoading,
//   //   success: data && true,
//   // };
// };
