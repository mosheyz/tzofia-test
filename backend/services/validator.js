import { alertsRepo } from "../DAL/alertsRepo.js";

export const checkExistAlert = async (id) => {
    const alert = await alertsRepo.getById(id);
    if (!alert) {
        const err = new Error("Alert not found");
        err.status = 404;
        throw err;
    }
    return alert;
};
