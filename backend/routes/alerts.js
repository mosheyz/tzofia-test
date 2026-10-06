import express from "express"
import { createAlert, deleteAlert, getAlertById, getAlerts, updateAlert } from "../controllers/alertsController.js"
import { validateSchema } from "../middleware/validateSchema.js"
import { createAlertSchema, updateAlertSchema } from "../services/alertSchema.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

export const router = express.Router()

router.use(authMiddleware)

router.get("/", getAlerts)
router.get("/:id", getAlertById)
router.post("/", validateSchema(createAlertSchema), createAlert)
router.put("/:id", validateSchema(updateAlertSchema), updateAlert)
router.delete("/:id", deleteAlert)