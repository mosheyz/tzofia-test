import jwt from "jsonwebtoken"

export const generateToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

    const token = jwt.sign({ id: user.id, role: user.role, assignedArena: user.assignedArena }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
    return token;
};