import { fail, success } from "../utils/resFormater.js";
import { checkExistAlert } from "../services/validator.js";
import { alertsRepo } from "../DAL/alertsRepo.js";

export const createAlert = async (req, res) => {
    const data = req.body;
    if (
        req.user.role === "general_user" ||
        (req.user.role === "arena_user" &&
            user.assignedArena !== "All" &&
            data.arena !== user.assignedArena)
    ) {
        const err = new Error("Not assignable to this arena");
        err.status = 400;
        throw err;
    }

    const alert = await alertsRepo.create(data);

    res.status(201).send(success(alert));
};

export const getAlerts = async (req, res) => {
    let filter = {};
    if (req.user.role === "arena_user" && user.assignedArena !== "All") {
        filter.arena = req.user.assignedArena;
    }
    const alerts = await alertsRepo.getAll(filter);

    res.status(200).send(success(alerts));
};

export const getAlertById = async (req, res) => {
    const { id } = req.params;
    const alert = await checkExistAlert(id);
    if (
        req.user.role === "arena_user" &&
        user.assignedArena !== "All" &&
        alert.arena !== req.user.assignedArena
    ) {
        const err = new Error("Not assignable to this arena");
        err.status = 400;
        throw err;
    }
    res.status(200).send(success(alert));
};

export const deleteAlert = async (req, res) => {
    const { id } = req.params;
    const alert = await checkExistAlert(id);

    if (
        req.user.role === "general_user" ||
        (req.user.role === "arena_user" &&
            user.assignedArena !== "All" &&
            alert.arena !== user.assignedArena)
    ) {
        const err = new Error("Not assignable to this arena");
        err.status = 400;
        throw err;
    }

    const result = await alertsRepo.delete(id);
    res.status(200).send(
        result ? success("deleted successfully") : fail("Something went wrong"),
    );
};

export const updateAlert = async (req, res) => {
    const { id } = req.params;
    const alert = await checkExistAlert(id);
    const data = req.body;

    if (
        req.user.role === "arena_user" &&
        user.assignedArena !== "All" &&
        alert.arena !== user.assignedArena
    ) {
        const err = new Error("Not assignable to this arena");
        err.status = 400;
        throw err;
    }
    if (req.user.role === "general_user") {
        const isStatusUpdate = Object.keys().includes("status");
        if (Object.keys().length > 1 || !isStatusUpdate) {
            const err = new Error("Not assignable");
            err.status = 400;
            throw err;
        }
    }
    const result = await alertsRepo.update(id, data);
    res.status(200).send(success(result));
};
