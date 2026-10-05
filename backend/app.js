import express from "express";
import "dotenv/config";
import { router as alertsRouter } from "./routes/alerts.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(logger);
app.use("/alerts", alertsRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
