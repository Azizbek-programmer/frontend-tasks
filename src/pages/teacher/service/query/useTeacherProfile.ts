// src/service/query/useTeacherProfile.ts
import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { TeacherDetailT } from "../../type";

export const useTeacherProfile = () => {
  return useQuery({
    queryKey: ["teacher-profile"],
    queryFn: () =>
      request.get<TeacherDetailT>("/teacher/details").then((res) => res.data),
  });
};
