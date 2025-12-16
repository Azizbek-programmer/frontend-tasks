import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/config/request";

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/teacher/${id}`).then((res) => res.data),
    onSuccess: () => {
      // Teacher listni qayta olish
      queryClient.invalidateQueries({ queryKey: ["teacher_list"] });
    },
    onError: (error) => {
      console.log("Delete error:", error);
    },
  });
};
