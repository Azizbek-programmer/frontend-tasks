import { request } from '@/config/rquest';
import { useMutation } from '@tanstack/react-query';
import type { LoginT } from '../types';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginT) => {
      try {
        const res = await request.post("/auth/signin", data);

        return res.data;
      } catch (error: any) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
      }
    },
  });
};
