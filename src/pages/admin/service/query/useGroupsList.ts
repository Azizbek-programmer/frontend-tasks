import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { IResponse } from "../../type";

interface GroupList {
  id: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  startTime: string | null;
  endTime: string | null;
  durationInMonths: number | null;

  students: {
    id: string;
  }[];

  teacher?: {
    id: string;
    name: string;
    avatarUrl: string;
  };
}


export const useGroupsList = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () =>
      request.get<IResponse<GroupList>>("/group").then((res) => res.data),
  });
};

export const useGroupsListPagination = (page: string) => {
  const pageNumber = Math.max(Number(page) || 1, 1); // ⚡
  return useQuery({
    queryKey: ["groups_list", pageNumber],
    queryFn: () =>
      request
        .get<IResponse<GroupList>>("/group", {
          params: {
            pageSize: 10,
            page: pageNumber,
          },
        })
        .then((res) => res.data),
  });
};


// export const useGroupsListPagination = (page: string) => {
//   return useQuery({
//     queryKey: ["groups", page],
//     queryFn: () =>
//       request
//         .get<IResponse<GroupList>>("/group", {
//           params: {
//             page,
//             pageSize: 10,
//           },
//         })
//         .then((res) => res.data),
//     keepPreviousData: true,
//   });
// };
