import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

interface User {
  name: string;
  email: string;
  username?: string;
  id: number;
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user",id],
    queryFn: () => request.get<User>(`/users/${id}`).then((res) => res.data),
  });
};
