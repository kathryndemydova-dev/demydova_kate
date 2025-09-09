import { useEffect, useState } from "react";
import { useClients } from "../features/clients/useClients";
import { useUpdateClientStatus } from "../features/clients/updateClientStatus.ts";
import type { Client } from "../types/client";
import CustomNotification from "../components/CustomNotification.tsx";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
    const page = 1;
    const limit = 1000;

    const { data, isLoading, isError, error } = useClients(page, limit);
    const [localClients, setLocalClients] = useState<Client[]>([]);
    const { mutate: updateStatus, isPending } = useUpdateClientStatus();
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (data?.data) {
            const filtered = data.data.filter(
                (client: Client) =>
                    client.status !== undefined &&
                    ["awaiting_payment", "debtor", "inactive"].includes(client.status)
            );
            setLocalClients(filtered);
        }
    }, [data]);

    const handleStatusChange = (id: string, newStatus: Client["status"]) => {
        updateStatus(
            { id, status: newStatus! },
            {
                onSuccess: (_, variables) => {
                    const { id } = variables;
                    setLocalClients((prev) => prev.filter((c) => c._id !== id));
                    setNotification({ message: "Status updated", type: "success" });
                    setTimeout(() => {
                        setNotification(null);
                        navigate("/");
                    }, 2000);
                },
                onError: (err: unknown) => {
                    const errorMessage = err instanceof Error ? err.message : "Unknown error";
                    setNotification({ message: `Error: ${errorMessage}`, type: "error" });
                    setTimeout(() => setNotification(null), 3000);
                },
            }
        );
    };

    const statusLabels: Record<NonNullable<Client["status"]>, string> = {
        active: "Active",
        inactive: "Inactive",
        awaiting_payment: "Awaiting payment",
        debtor: "Debtor",
    };

    const formatDate = (isoDate?: string) => {
        if (!isoDate) return "Not specified";
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError && error instanceof Error) return <p style={{ color: "red" }}>{error.message}</p>;

    return (
        <div>
            {notification && (
                <CustomNotification
                    message={notification.message}
                    type={notification.type}
                    duration={3000}
                    onClose={() => setNotification(null)}
                />
            )}
            <h2>Awaiting payment</h2>
            {localClients.length === 0 ? (
                <p>No clients awaiting payment found</p>
            ) : (
                <ul className="payment-page">
                    {localClients.map((client) => (
                        <li key={client._id} className="payment-card">
                            <h3>{client.name}</h3>
                            <p>Phone: {client.phone}</p>
                            <p>Email: {client.email}</p>
                            <p>
                                Status:{" "}
                                {client.status && (
                                    <span className={`status-badge status-${client.status}`}>
                            {statusLabels[client.status]}
                        </span>
                                )}
                            </p>
                            <p>
                                Amount due: <strong>{client.amount ?? "Not specified"}</strong>
                            </p>
                            <p>Due date: {formatDate(client.dueDate)}</p>

                            <div>
                                <label>Change status:</label>
                                <select
                                    defaultValue=""
                                    onChange={(e) =>
                                        handleStatusChange(client._id, e.target.value as Client["status"])
                                    }
                                    disabled={isPending}
                                >
                                    <option value="" disabled>
                                        Select status
                                    </option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="debtor">Debtor</option>
                                </select>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
