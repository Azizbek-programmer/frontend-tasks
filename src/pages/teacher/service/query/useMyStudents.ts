import { useQuery } from "@tanstack/react-query";
import { request } from "@/config/request";

export interface MyStudent {
  id: string;
  name: string;
  email: string;
  grade: string | null;
  behavior: string | null;
}

interface MyStudentsResponse {
  data: MyStudent[];
}

export const useMyStudents = () => {
  return useQuery<MyStudentsResponse>({
    queryKey: ["my-students"],
    queryFn: () =>
      request.get("/student/my-students").then((res) => res.data),
  });
};
