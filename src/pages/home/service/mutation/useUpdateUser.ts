import { useMutation } from "@tanstack/react-query";
import { request } from "@/config/request";

export const useUpdateUser = (id: number) => {
  return useMutation({
    mutationFn: (data: { name: string; email: string; username: string }) =>
      request.patch(`/users/${id}`, data).then((res) => res.data),
  });
};
