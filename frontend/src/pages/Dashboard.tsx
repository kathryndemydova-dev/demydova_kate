import {useEffect, useState, useMemo} from "react";
import axios from "axios";
import type {Client} from './../types/client.ts';
import {Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import './Dashboard.css';

export default function Dashboard() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const newClientsThisMonth = clients.filter((c) => {
        const created = new Date(c.createdAt);
        return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
    }).length;

    const STATUS_ORDER = ["active", "awaiting_payment", "debtor", "inactive"] as const;
    const STATUS_LABELS: Record<(typeof STATUS_ORDER)[number], string> = {
        active: "Active",
        awaiting_payment: "Awaiting payment",
        debtor: "Debtor",
        inactive: "Inactive",
    };
    const groupedData = STATUS_ORDER.map((s, _) => ({
        key: s,
        name: STATUS_LABELS[s],
        value: clients.filter(c => c.status === s).length,
    }));

    const colors = ["#4CAF50", "#FFC107", "#FF5722", "#9C27B0"];

    useEffect(() => {
        axios
            .get("/api/clients", {params: {page: 1, limit: 1000}})
            .then((res) => {
                setClients(res.data.data);
            })
            .catch((err) => {
                console.log("Error loading data", err);
            })
            .finally(() => setLoading(false));
    }, []);

    const top3ByStatus = useMemo(() => {
        const groups: Record<string, Client[]> = {};
        for (const c of clients) {
            const s = c.status ?? "unknown";
            (groups[s] ||= []).push(c);
        }
        for (const s of Object.keys(groups)) {
            groups[s].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            groups[s] = groups[s].slice(0, 3);
        }
        return groups;
    }, [clients]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="dashboard-wrapper">
            <h2 className="dashboard-title">Dashboard</h2>

            <div className="dashboard-chart">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={groupedData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius="70%"
                            label
                        >
                            {groupedData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend verticalAlign="bottom"/>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <p className="dashboard-subtitle">
                New clients this month: {newClientsThisMonth}
            </p>

            <div className="top3-grid">
                {STATUS_ORDER.map((status) => {
                    const arr = top3ByStatus[status] ?? [];
                    return (
                        <div key={status} className="card">
                            <h4>Top-3: {STATUS_LABELS[status]}</h4>
                            <ol>
                                {arr.length === 0 ? (
                                    <li>немає даних</li>
                                ) : (arr.map(c => (
                                        <li key={c._id ?? c.email}>
                                            {c.name || c.email}
                                            <small style={{marginLeft: 6, opacity: .7}}>
                                                {c.createdAt ? new Date(c.createdAt).toLocaleDateString("uk-UA") : ""}
                                            </small>
                                        </li>
                                    ))
                                )}
                            </ol>
                        </div>
                    );
                })}
            </div>
            );
        </div>
    )}