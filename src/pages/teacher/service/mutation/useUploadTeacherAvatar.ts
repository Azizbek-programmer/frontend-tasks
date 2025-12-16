// service/mutation/useUploadTeacherAvatar.ts
import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useUploadTeacherAvatar = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch("/teacher/update-avatar", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
