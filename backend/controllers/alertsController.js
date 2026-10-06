import { fail, success } from "../utils/resFormater.js";
import { checkExistAlert } from "../services/validator.js";
import { alertsRepo } from "../DAL/alertsRepo.js";

export const createAlert = async (req, res) => {
    const data = req.body;
    const alert = await alertsRepo.create(data);
    
    res.status(201).send(success(alert));
};

export const getAlerts = async (req, res) => {
    const alerts = await alertsRepo.getAll();
    if (req.user.role === "arena_user") {
        protectedAlerts = alerts.filter(alert => alert.arena =)
    }
    res.status(200).send(success(alerts));
};

export const getAlertById = async (req, res) => {
    const { id } = req.params;
    const alert = await checkExistAlert(id);
    res.status(200).send(success(alert));
};

export const deleteAlert = async (req, res) => {
    const { id } = req.params;
    await checkExistAlert(id);
    const result = await alertsRepo.delete(id);
    res.status(200).send(
        result ? success("deleted successfully") : fail("Something went wrong"),
    );
};

export const updateAlert = async (req, res) => {
    const { id } = req.params;
    await checkExistAlert(id);
    const data = req.body;
    const result = await alertsRepo.update(id, data);
    res.status(200).send(success(result));
};
