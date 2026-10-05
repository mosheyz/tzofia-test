import { success } from "../utils/resFormater.js";
import { checkExistAlert } from "../services/validator.js";

export const createAlert = async (req, res) => {
    const data = req.body;
    const alert = await createAlert(data);
    res.status(201).send(success(alert));
};

export const getAlerts = async (req, res) => {
    const alerts = await getAll();
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
    const result = await delete(id);
    res.status(200).send(success("deleted successfully"));
};

export const updateAlert = async (req, res) => {
    const { id } = req.params;
    await checkExistAlert(id);
    const data = req.body;
    const result = await updateAlert(id, data);
    res.status(200).send(success(result));
};
