import AlertsMap from "../components/AlertsMap";
import Header from "../components/Header";
import { useGetAlerts } from "../hooks/useApiRequests";
import useFilterStore from "../store/useFilterStore";
import type { Alert } from "../types/types";

const HomePage = () => {
    const { data, isPending, isError, error } = useGetAlerts();
    const { arenaFilter, priorityFilter, search } = useFilterStore();

    const alerts = data || [];

    const filteredAlerts = alerts.filter((alert: Alert) => {
        const searchFiltered = alert.displayName.includes(search);
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
            <AlertsMap alerts={filteredAlerts} height={520} className="myMap" />
        </div>
    );
};

export default HomePage;
