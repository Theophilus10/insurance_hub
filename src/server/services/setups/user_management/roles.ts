// import useSWR from "swr";
// import { fetcher } from "../../../shared";
// import { format } from "date-fns";
// import API from "@app/server/useAxios";
// import { axiosError, callResult, queryResult } from "@app/server/shared";

// export interface IRole {
//   id: number;
//   name: string;
//   created_at: string;
//   updated_at: string;
// }

// // export const read_roles = () => {
// //   const { data, error, isLoading, mutate } = useSWR(
// //     "/roles/all",
// //     fetcher
// //   );

// //   return {
// //     items: data
// //       ? data.map((x: IRole) => ({
// //           ...x,
// //           created_at: format(new Date(x.created_at), "dd MMMM yyy"),
// //         }))
// //       : [],
// //     isLoading,
// //     isError: error,
// //     mutate,
// //     success: data && true,
// //   };
// // };

// export const create_role = async (data: { name: string }) => {
//   try {
//     const res = await API.post("/roles/", data);
//     // console.log(res);
//     return callResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
// };

// export const delete_role = async (id: number) => {
//   try {
//     const res = await API.delete(`/roles/${id}`);
//     // console.log(res)
//     return callResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
// };

// export const update_role = async (id: number, data: { name: string }) => {
//   try {
//     const res = await API.put(`/roles/${id}`, data);
//     return callResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
// };

// export const read_role = async (id: number) => {
//   try {
//     const res = await API.get(`/roles/${id}`);
//     return queryResult(res, res.data);
//   } catch (err) {
//     return axiosError(err);
//   }
// };
