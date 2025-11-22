import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

interface User {
  name: string;
  username: string;
  email: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: User) =>
      request.post("/users", data).then((res) => res.data),
  });
};
