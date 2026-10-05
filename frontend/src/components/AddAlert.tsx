import React, { useState } from "react";
import { useCreateAlert } from "../hooks/useApiRequests";
import type { Status, Arena, Priority } from "../types/types";


const AddAlert = () => {
    const { mutate, isPending, isError, error } = useCreateAlert();

    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("");
    const [arena, setArena] = useState<Arena>("");
    const [status, setStatus] = useState<Status>("");
    let [lon, setLon] = useState(0);
    let [lat, setLat] = useState(0);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        lon = Number(lon);
        lat = Number(lat);
        mutate({ displayName, description, priority, arena, status, lat, lon });
    };

    if (isPending) return <div>Creating..</div>;

    return (
        <div>
            Add alert here:
            {isError && <div>Error: {error.message}</div>}
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    name="displayName"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Describe the alert.."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select
                    name="priority"
                    id="priority"
                    value={priority}
                    onChange={(e: any) => setPriority(e.target.value)}
                    required
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
                    required
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
                    required
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
                    onChange={(e: any) => {
                        console.log(e.target.value);
                        setLon(Number(e.target.value));
                    }}
                    required
                />
                <input
                    type="number"
                    step="0.0001"
                    name="lat"
                    min={-90}
                    max={90}
                    value={lat}
                    onChange={(e: any) => setLat(e.target.value)}
                    required
                />
                <button type="submit">Send alert</button>
            </form>
        </div>
    );
};

export default AddAlert;
