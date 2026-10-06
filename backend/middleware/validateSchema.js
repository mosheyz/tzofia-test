import { safeParse } from "zod";

export const validateSchema = (schema) => (req, res, next) => {
    if (req.body.x) req.body.lon = req.body.x;
    if (req.body.y) req.body.lat = req.body.y;
    const isValid = schema.safeParse(req.body);
    if (!isValid.success) {
        const err = new Error(
            `Invalid data: ${isValid.error.issues[0]?.message}`,
        );
        err.status = 400;
        throw err;
    }
    req.body = isValid.data;
    next();
};
