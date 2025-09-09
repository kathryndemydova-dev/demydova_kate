const BASE_URL = 'http://localhost:5000/api/clients';

import type { Client } from "../types/client";

export const getClients = async (searchTerm = "", page: number = 1, limit: number = 10): Promise<Client[]> => {
    const url = `${BASE_URL}?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch clients");
    return res.json();
};

export const getClientById = async (id: string): Promise<Client> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Client with ID ${id} not found`);
    const json = await res.json();
    return json.data;
};

export const createClient = async (client: Omit<Client, "id" | "createdAt">): Promise<Client> => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
    });
    if (!res.ok) throw new Error("Failed to create client");
    return res.json();
};

export const updateClient = async (
    id: string,
    updates: Partial<Omit<Client, "_id">>
): Promise<Client> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update client");
    return res.json();
};

export const deleteClient = async (id: string): Promise<{ message: string }> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete client");
    return res.json();
};