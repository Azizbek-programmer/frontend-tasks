import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";

export interface TeacherGroupDetail {
  id: string;
  name: string;
  startTime: string | null;
  endTime: string | null;
  durationInMonths: number | null;
  teacher: {
    id: string;
    name: string;
    avatarUrl?: string; 
  };
  students: { id: string; name: string }[];
}

export const useTeacherGroupDetail = (id: string) => {
  return useQuery({
    queryKey: ["teacher-group", id],
    queryFn: () =>
      request
        .get<{ data: TeacherGroupDetail }>(`/group/for-teacher/${id}`, {
          headers: { Authorization: `Bearer ${Cookie.get("token")}` },
        })
        .then((res) => res.data),
    enabled: !!id,
  });
};
