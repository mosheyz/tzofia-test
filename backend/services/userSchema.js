import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
    email: z.string().email(),
    role: z.enum(["admin", "general_user", "arena_user"]),
    assignedArena: z.enum(["North", "South", "Center", "All"]),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
