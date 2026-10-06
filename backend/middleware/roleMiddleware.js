export const roleMiddleware = (...allowedRoles) => (req, res, next) => {
    if (!req.user) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }
    if (!allowedRoles.includes(req.user.role)) {
        const err = new Error("No permissions");
        err.status = 403;
        throw err;
    }
    next();
};