import axios from "axios";
import type { Alert, CreateAlert, CreateUser } from "../types/types";

const ALERT_URL = "http://localhost:3001/api/alerts";
const AUTH_URL = "http://localhost:3001/api/auth";

// const getHeader = () => {
//     return {
//         headers: { Authorization: `Bearer ${token}` },
//     };
// };

export const alertRequests = {
    create: async (token:string, alert: CreateAlert) => {
        alert.lon = Number(alert.lon);
        alert.lat = Number(alert.lat);
        const res = await axios.post(ALERT_URL, alert, {
        headers: { Authorization: `Bearer ${token}` },
    });
        return res.data.data;
    },
    get: async (token: string) => {
        console.log("hi from get");
        const res = await axios.get(ALERT_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("hi hi");
        // console.log(getHeader())
        return res.data.data;
    },
    delete: async (token: string, id: string) => {
        const res = await axios.delete(`${ALERT_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    },
    update: async (token: string, id: string, alert: Partial<Alert>) => {
        if (alert.lon) alert.lon = Number(alert.lon);
        if (alert.lat) alert.lat = Number(alert.lat);
        const res = await axios.put(`${ALERT_URL}/${id}`, alert, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    },
};

export const usersRequests = {
    register: async (token: string, user: CreateUser) => {
        const res = await axios.post(AUTH_URL + "/register", user, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    },
    login: async (user: { email: string; password: string }) => {
        console.log(user);
        const res = await axios.post(AUTH_URL + "/login", user);
        return res.data.data;
    },
    getUsers: async (token: string) => {
        const res = await axios.get(AUTH_URL + "/users", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    },
    delete: async (token: string, id: string) => {
        const res = await axios.delete(`${AUTH_URL}/users${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    },
    getMe: async (token: string) => {
        const res = await axios.get(AUTH_URL + "/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    },
};
