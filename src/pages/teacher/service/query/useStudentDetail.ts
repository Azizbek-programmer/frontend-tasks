import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { StudentDetailT } from "../../type";

export const useStudentDetail = (id: string) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () =>
      request
        .get<StudentDetailT>(`/student/for-teacher/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  });
};
