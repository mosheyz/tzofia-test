import { useNavigate } from "react-router";
import AlertsMap from "../components/AlertsMap";
import Header from "../components/Header";
import { useDeleteAlert, useGetAlerts } from "../hooks/useApiRequests";
import useFilterStore from "../store/useFilterStore";
import type { Alert } from "../types/types";

const HomePage = () => {
    const { data, isPending, isError, error } = useGetAlerts();
    const { arenaFilter, priorityFilter, search } = useFilterStore();
    const { mutate: deleteAlert, isPending: isPendingDelete } = useDeleteAlert();
    const navigate = useNavigate();

    const alerts = data || [];

    const filteredAlerts = alerts.filter((alert: Alert) => {
        const searchFiltered = alert.displayName
            .toLowerCase()
            .includes(search.toLowerCase());
        const arenaFiltered =
            arenaFilter === "*" || alert.arena === arenaFilter;
        const priorityFiltered =
            priorityFilter === "*" || alert.priority === priorityFilter;

        return searchFiltered && arenaFiltered && priorityFiltered;
    });

    if (isPending) return <div>Loading alerts..</div>;

    return (
        <div>
            {isError && <div>Error: {error.message}</div>}
            <Header />
            <div className="alerts-container">
                <div>
                    <AlertsMap
                        alerts={filteredAlerts}
                        height={520}
                        className="myMap"
                    />
                </div>
                <div className="alerts-list">
                    Alert list:
                    {filteredAlerts.map((alert: Alert) => (
                        <div className="alert-row" key={alert.id}>
                            <h3>{alert.displayName}</h3>
                            <p>{alert.arena}</p>
                            <p>{alert.priority}</p>
                            <h3>{alert.status}</h3>
                            <button disabled={isPending || isPendingDelete} onClick={ () => navigate(`/update/${alert.id}`)}>Update</button>
                            <button disabled={isPending || isPendingDelete} onClick={ () => deleteAlert(alert.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
