import React from "react";
import { useGetAlerts } from "../hooks/useApiRequests";

const MapListPage = () => {
    const { data: alerts, isPending, isError, error } = useGetAlerts();

    if (isPending) return <div>Loading alerts..</div>;

    return (
        <div>
            MapListPage
            {isError && <div>Error: {error.message}</div>}
            <nav>{alerts && alerts.map((alert) => ({
                <li key></li>
            }))}</nav>
        </div>
    );
};

export default MapListPage;
