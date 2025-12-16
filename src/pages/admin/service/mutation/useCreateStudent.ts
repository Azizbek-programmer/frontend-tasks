import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export interface CreateStudentDto {
  name: string;
  email: string;
  password: string;
  groupId: string;
}

export const useCreateStudent = () => {
  return useMutation({
    mutationFn: (data: CreateStudentDto) =>
      request.post("/student", data).then((res) => res.data),
  });
};
