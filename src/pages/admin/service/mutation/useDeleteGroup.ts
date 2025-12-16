import { useMutation } from "@tanstack/react-query";
import { request } from "@/config/request";

export const useDeleteGroup = (groupId: string) => {
    return useMutation({
        mutationFn: () =>
            request.delete(`/group/${groupId}`).then((res) => res.data),
    });
};
