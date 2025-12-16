import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { IResponse } from "../../type";
import Cookie from "js-cookie";

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
  students: { id: string; name: string }[];
  teacher: { id: string; name: string; avatarUrl: string };
  studentCount?: number;
}

export const useTeacherGroupsList = () => {
  return useQuery({
    queryKey: ["teacher-groups"],
    queryFn: () =>
      request
        .get<IResponse<GroupList>>("/group/my-groups", {
          headers: { Authorization: `Bearer ${Cookie.get("token")}` },
        })
        .then((res) => res.data),
  });
};
