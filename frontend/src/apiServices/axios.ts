import axios from "axios";
import type { Alert, CreateAlert } from "../types/types";

const URL = "http://localhost:3001/api/alerts";

export const alertRequests = {
    create: async (alert: CreateAlert) => {
        alert.lon = Number(alert.lon);
        alert.lat = Number(alert.lat);
        const res = await axios.post(URL, alert);
        return res.data.data;
    },
    get: async () => {
        const res = await axios.get(URL);
        return res.data.data;
    },
    delete: async (id: string) => {
        const res = await axios.delete(`${URL}/${id}`);
        return res.data.data;
    },
    update: async (id: string, alert: Partial<Alert>) => {
        alert.lon = Number(alert.lon);
        alert.lat = Number(alert.lat);
        const res = await axios.put(`${URL}/${id}`, alert);
        return res.data.data;
    },
};
