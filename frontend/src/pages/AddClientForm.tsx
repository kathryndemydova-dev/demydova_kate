import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createClient} from "../api/clientsApi.ts";
import {useNavigate} from "react-router-dom";
import ClientForm, {type FormValues} from "../components/ClientForm.tsx";
import type {Client} from "../types/client.ts";
import CustomNotification from '../components/CustomNotification.tsx'
import {useState} from "react";

export default function AddClientForm() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const {mutate, isPending} = useMutation({
        mutationFn: createClient,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["clients"]});
            setNotification({message: "Client successfully added", type: "success"});
            setTimeout(() => {
                setNotification(null);
                navigate("/");
            }, 2000);
        },

        onError: (error: unknown) => {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            setNotification({message: `Error: ${errorMessage}`, type: "error"});
            setTimeout(() => setNotification(null), 3000);
        },
    });

    const onSubmit = (data: FormValues) => {
        const queryData = queryClient.getQueryData<Client[]>(["clients"]);
        const clients = queryData ?? [];

        const existing = clients.find(
            (client) => client.email.trim().toLowerCase() === data.email.trim().toLowerCase()
        );

        if (existing) {
            const confirmDuplicate = window.confirm(
                `Клієнт "${data.email}" вже існує. Додати ще одного?`
            );
            if (!confirmDuplicate) return;
        }

        mutate(data);
    };

    return (
        <>
            {notification && (<CustomNotification
                    message={notification.message}
                    type={notification.type}
                    duration={3000}
                    onClose={() => setNotification(null)}
                />
            )}
            <ClientForm
                title="ADD NEW CLIENT"
                onSubmit={onSubmit}
                isPending={isPending}
                defaultValues={{
                    isVip: false,
                    status: "active",
                }}
            />
        </>
    );
}