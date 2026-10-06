import type { Alert } from "../types/types";

const AlertAll = (alerts: Alert[]) => {
    const isAlert = alerts.filter((alert: Alert) => {
        const isCritical = alert.priority === "Critical"
        const isActive = alert.status === "Active"
        const now = Date.now()
        const isNow = now - Number(alert.createdAt) <= 15000
        return isCritical && isActive && isNow
    })
    const isNorth = isAlert.

    return <div>AlertAll</div>;
};

export default AlertAll;
