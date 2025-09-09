import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export function useUpdateClientStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, status}: { id: string; status: string }) => {
            const res = await axios.patch(`/api/clients/${id}`, {status});
            if (!res.data || res.status !== 200) throw new Error("Failed");
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["clients"]});
        },
    });
}