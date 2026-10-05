import { safeParse } from "zod";

export const validateSchema = (schema) => (req, res, next) => {
    const isValid = schema.safeParse(req.body);
    if (!isValid.success) {
        console.log(isValid)
        const err = new Error(`Invalid data: ${isValid.error.issues}`);
        err.status = 400;
        throw err;
    }
    next()
};
