import React, { useEffect, useState } from "react";
import { useGetAlerts, useUpdateAlert } from "../hooks/useApiRequests";
import { type Arena, type Alert, type Priority, type Status } from "../types/types";
import { useParams } from "react-router";

const UpdateAlert = () => {
    const { id } = useParams();
    const {
        data: alerts,
        isPending: isLoadingAlerts,
        isError: isErrorAlerts,
        error: errorAlerts,
    } = useGetAlerts();
    const alertToUpdate = alerts?.find((alert: Alert) => alert.id === id);

    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("*");
    const [arena, setArena] = useState<Arena>("*");
    const [status, setStatus] = useState<Status>("*");
    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);

    const { mutate, isPending, isError, error } = useUpdateAlert();

    useEffect(() => {
        if (alertToUpdate) {
            setDisplayName(alertToUpdate.displayName);
            setDescription(alertToUpdate.description);
            setPriority(alertToUpdate.priority);
            setArena(alertToUpdate.arena);
            setStatus(alertToUpdate.status);
            setLon(alertToUpdate.lon);
            setLat(alertToUpdate.lat);
        }
    }, [alertToUpdate]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        let updatedAlert: Partial<Alert> = {}

        if (alertToUpdate.displayName !== displayName) updatedAlert.displayName = displayName;
        if (alertToUpdate.description !== description) updatedAlert.description = description;
        if (alertToUpdate.status !== status) updatedAlert.status = status;
        if (alertToUpdate.priority !== priority) updatedAlert.priority = priority;
        if (alertToUpdate.arena !== arena) updatedAlert.arena = arena;
        if (alertToUpdate.lon !== lon) updatedAlert.lon = lon;
        if (alertToUpdate.lat !== lat) updatedAlert.lat = lat;
        
        mutate({ id, alert: updatedAlert });
    };

    if (isPending || isLoadingAlerts) return <div>Updating..</div>;

    return (
        <div>
            Update alert here:
            {(isError || isErrorAlerts) && (
                <div>Error: {error?.message || errorAlerts?.message}</div>
            )}
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    name="displayName"
                    placeholder="Your name"
                    value={displayName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDisplayName(e.target.value)
                    }
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Describe the alert.."
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(e.target.value)
                    }
                />
                <select
                    name="priority"
                    id="priority"
                    value={priority}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setPriority(e.target.value)
                    }
                    }
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
                >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                </select>
                <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setStatus(e.target.value)
                    }
                >
                    <option value="Active">Active</option>
                    <option value="Handled">Handled</option>
                </select>
                <label>
                    lon
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
                    />
                </label>
                <label>
                    lat
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
                    />
                </label>
                <button type="submit" disabled={isPending || isLoadingAlerts}>
                    Update alert
                </button>
            </form>
        </div>
    );
};

export default UpdateAlert;
