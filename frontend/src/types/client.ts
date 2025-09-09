export type ClientStatus = "active" | "inactive" | "awaiting_payment" | "debtor";


export interface Client {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    position?: string;
    isVip?: boolean;
    status?: ClientStatus;
    amount?: string;
    dueDate?: string;
    createdAt: string;
}