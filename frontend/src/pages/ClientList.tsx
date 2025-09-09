import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {useClients} from "../features/clients/useClients";
import {deleteClient} from "../api/clientsApi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {Client} from "../types/client";
import ClientCard from "../components/ClientCard";
import {confirm} from "../components/ConfirmDialog.tsx";
import {Pagination} from "../components/Pagination.tsx";
import CustomNotification from "../components/CustomNotification.tsx";

function ClientList() {
    const {searchTerm}: { searchTerm: string } = useOutletContext();
    const [visibleCount] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const limit = 1000;
    const {data, isLoading, isError, error} = useClients(1, limit);
    const queryClient = useQueryClient();

    const allClients = data?.data || [];
    const filteredClients = allClients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastClientsIndex = currentPage * visibleCount;
    const firstClientsIndex = lastClientsIndex - visibleCount;
    const currentClients = filteredClients.slice(firstClientsIndex, lastClientsIndex);

    const {mutate: deleteMutate, isPending: isDeleting} = useMutation({
        mutationFn: deleteClient,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["clients"]});
            setNotification({message: "Client successfully deleted", type: "success"});
            setTimeout(() => {
                setNotification(null);
            }, 2000);
        },
        onError: (error: unknown) => {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            setNotification({message: `Error: ${errorMessage}`, type: "error"});
            setTimeout(() => setNotification(null), 3000);
        },
    });


    const handleDelete = async (id: string) => {
        const isConfirmed = await confirm({message: "Are you sure you want to delete this client?"});
        if (isConfirmed) {
            deleteMutate(id);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError && error instanceof Error)
        return <p style={{color: "red"}}>{error.message}</p>;

    return (
        <div className="container">
            {notification && (
                <CustomNotification message={notification.message}
                                    type={notification.type}
                                    duration={3000}
                                    onClose={() => setNotification(null)}/>
            )}
            <div className="client-list">
                {currentClients.length === 0 ? (
                    <p>No clients found</p>
                ) : (
                    currentClients.map((client: Client) => (
                        <ClientCard
                            key={client._id}
                            client={client}
                            onDelete={handleDelete}
                            isPending={isDeleting}
                        />
                    ))
                )}
            </div>

            {filteredClients.length > visibleCount && (
                <div style={{textAlign: "center", marginTop: "1rem"}}>
                    <Pagination
                        visibleCount={visibleCount}
                        totalClients={filteredClients.length}
                        currentPage={currentPage}
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                    />
                </div>
            )}
        </div>
    );
}

export default ClientList;
