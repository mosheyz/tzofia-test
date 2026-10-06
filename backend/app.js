import express from "express";
import "dotenv/config";
import { router as alertsRouter } from "./routes/alerts.js";
import {router as authRouter} from "./routes/users.js"
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
app.use(logger);
app.use("/api/alerts", alertsRouter);
app.use("/api/auth", authRouter)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
