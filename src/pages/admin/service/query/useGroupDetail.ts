import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { GroupDetailT } from "../../type";

export const useGroupDetail = (id: string) => {
    return useQuery({
        queryKey: ["group", id],
        queryFn: () =>
            request.get<GroupDetailT>(`/group/for-admin${id}`).then((res) => res.data),
        enabled: !!id,
    });
};
