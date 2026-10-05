import { fail } from "../utils/resFormater.js";

export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    console.error({Error: {status: err.status, message: err.message, fullErr: err}})
    res.status(status).send(fail(message))
}