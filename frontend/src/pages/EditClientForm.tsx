import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import {getClientById, updateClient} from "../api/clientsApi";
import type {Client} from "../types/client";
import ClientForm, {type FormValues} from "../components/ClientForm";
import {useState} from "react";
import CustomNotification from "../components/CustomNotification.tsx";

export default function EditClientForm() {
    const {id} = useParams();
    const clientId = id || "";

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery<Client, Error>({
        queryKey: ["client", clientId],
        queryFn: () => getClientById(clientId),
        enabled: !!clientId,
    });

    const {mutate, isPending} = useMutation({
        mutationFn: (updatedData: FormValues) =>
            updateClient(clientId, updatedData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clients"] });
            setNotification({ message: "Client successfully updated", type: "success" });
            setTimeout(() => {
                setNotification(null);
                navigate("/");
            }, 2000);
        },
        onError: (error: unknown) => {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            setNotification({message: `Error: ${errorMessage}`, type: "error"});
            setTimeout(() => setNotification(null), 3000);
        },
    });

    const handleSubmit = (data: FormValues) => {
        mutate(data);
    };

    if (isLoading) return <p>Data loading...</p>;
    if (isError && error instanceof Error)
        return <p style={{color: "red"}}>{error.message}</p>;
    if (!data) return <p>Client not found</p>;

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
                title="Edit client"
                defaultValues={data}
                onSubmit={handleSubmit}
                isPending={isPending}
            />
        </>
    );
}