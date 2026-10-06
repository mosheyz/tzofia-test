import React, { useState } from "react";
import { useCreateAlert } from "../hooks/useApiRequests";
import type { Status, Arena, Priority } from "../types/types";

const AddAlert = () => {
    const { mutate, isPending, isError, error } = useCreateAlert();

    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("Low");
    const [arena, setArena] = useState<Arena>("Center");
    const [status, setStatus] = useState<Status>("Active");
    let [lon, setLon] = useState(0);
    let [lat, setLat] = useState(0);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDisplayName(e.target.value)
                    }
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Describe the alert.."
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(e.target.value)
                    }
                    required
                />
                <select
                    name="priority"
                    id="priority"
                    value={priority}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setPriority(e.target.value)
                    }
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setArena(e.target.value)
                    }
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setStatus(e.target.value)
                    }
                    }
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLon(Number(e.target.value))
                    }
                    required
                />
                <input
                    type="number"
                    step="0.0001"
                    name="lat"
                    min={-90}
                    max={90}
                    value={lat}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLat(Number(e.target.value))
                    }
                    required
                />
                <button type="submit">Send alert</button>
            </form>
        </div>
    );
};

export default AddAlert;
