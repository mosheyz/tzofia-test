import React, { useState } from "react";
import { useUpdateAlert } from "../hooks/useApiRequests";
import type { Status, Arena, Priority } from "../types/types";

const UpdateAlert = () => {
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority | "">("");
    const [arena, setArena] = useState<Arena | "">("");
    const [status, setStatus] = useState<Status | "">("");
    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);
    const [alertId, setAlertId] = useState("");

    const { mutate, isPending, isError, error } = useUpdateAlert(alertId);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        mutate();
    };

    if (isPending) return <div>Creating..</div>;

    return (
        <div>
            Add alert here:
            {isError && <div>Error: {error.message}</div>}
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    name="alertId"
                    placeholder="alertId"
                    value={alertId}
                    onChange={(e) => setAlertId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="displayName"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Describe the alert.."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    name="priority"
                    id="priority"
                    value={priority}
                    onChange={(e: any) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
                <select
                    name="arena"
                    id="arena"
                    value={arena}
                    onChange={(e: any) => setArena(e.target.value)}
                >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                </select>
                <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                >
                    <option value="Active">Active</option>
                    <option value="Handled">Handled</option>
                </select>
                <input
                    type="number"
                    name="lon"
                    step="0.0001"
                    min={-180}
                    max={180}
                    value={lon}
                    onChange={(e: any) => setLon(Number(e.target.value))}
                />
                <input
                    type="number"
                    step="0.0001"
                    name="lat"
                    min={-90}
                    max={90}
                    value={lat}
                    onChange={(e: any) => setLat(e.target.value)}
                />
                <button type="submit">Send alert</button>
            </form>
        </div>
    );
};

export default UpdateAlert;
