import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const auth = req.header("Authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }
    try {
        const token = auth.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }
    next();
};
