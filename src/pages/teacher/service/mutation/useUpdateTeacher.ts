// service/mutation/useUpdateTeacher.ts
import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import type { TeacherField } from "../../type";

export const useUpdateTeacher = () => {
  return useMutation({
    mutationFn: (data: TeacherField) =>
      request.patch("/teacher/details", data).then((res) => res.data),
  });
};
