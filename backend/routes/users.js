import express from "express"
import { validateSchema } from "../middleware/validateSchema.js"
import { deleteUser, getAllUsers, getUserById, login, register } from "../controllers/usersController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { roleMiddleware } from "../middleware/roleMiddleware.js"
import { loginSchema, registerSchema } from "../services/userSchema.js"

export const router = express.Router()

router.post("/login", validateSchema(loginSchema), login)

router.get("/me", authMiddleware, getUserById)
router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers)
router.post("/register", authMiddleware, roleMiddleware("admin"), validateSchema(registerSchema), register)
router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), deleteUser)