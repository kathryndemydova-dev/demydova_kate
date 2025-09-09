import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import type {Client} from "../../types/client";

interface ClientsResponse {
    data: Client[];
    total: number;
}

export const useClients = (page: number, limit: number) => {
    return useQuery<ClientsResponse>({
        queryKey: ["clients", page],
        queryFn: async () => {
            const res = await axios.get("/api/clients", {
                params: {page, limit},
            });
            return res.data;
        }
    });
};