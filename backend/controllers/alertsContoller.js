import { success } from "../utils/resFormater.js";
import { checkExistAlert } from "../services/validator.js";
import { alertsRepo } from "../DAL/alertsRepo.js";

export const createAlert = async (req, res) => {
    const data = req.body;
    const insertedId = await alertsRepo.create(data);
    const alert = await checkExistAlert(insertedId)
    res.status(201).send(success(alert));
};

export const getAlerts = async (req, res) => {
    const alerts = await alertsRepo.getAll();
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
    res.status(200).send(success("deleted successfully"));
};

export const updateAlert = async (req, res) => {
    const { id } = req.params;
    await checkExistAlert(id);
    const data = req.body;
    const result = await alertsRepo.update(id, data);
    res.status(200).send(success(result));
};
