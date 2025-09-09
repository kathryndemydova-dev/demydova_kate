import type {Client} from "../types/client.ts";
import {Link} from "react-router-dom";
import {Pencil} from "lucide-react";

interface Props {
    client: Client;
    onDelete?: (id: string) => void;
    isPending?: boolean;
}

const statusLabels: Record<
    "active" | "inactive" | "awaiting_payment" | "debtor",
    string
> = {
    active: "Active",
    inactive: "Inactive",
    awaiting_payment: "Awaiting payment",
    debtor: "Debtor"
};

export function ClientCard({client, onDelete}: Props) {
    const handleDelete = () => onDelete?.(client._id);

    return (
        <div className="client-card">
            <h3>{client.name}</h3>
            <p>Email: {client.email}</p>
            <p>Phone: {client.phone}</p>
            <p>Company: {client.company?.trim() ? client.company : "-"}</p>
            <p>
                Status: <span
                className={`status-badge status-${client.status}`}>{statusLabels[client.status || "inactive"]}</span>
            </p>
            {client.isVip && <p style={{color: "gold"}}>🌟 VIP</p>}

            <div className="card-actions">
                <Link to={`/clients/${client._id}/edit`} className="edit-button">
                    <Pencil size={20} style={{marginRight: "10px", verticalAlign: "middle"}}/>
                </Link>
                <button onClick={handleDelete} className="delete-button">
                    🗑
                </button>
            </div>
        </div>
    );
}

export default ClientCard;