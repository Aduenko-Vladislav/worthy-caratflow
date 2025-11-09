import express from "express";
import logger from "../logger/winstonLogging.js";
import pricingRouter from "../routes/pricingRouter.js";
import { errorHandler } from "../errors/errors.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3500;

app.use("/price", pricingRouter);

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use((req, res) => {
  res.status(404).send(`path ${req.path} is not found`);
});

app.use(errorHandler);
app.listen(PORT, () => logger.info(`Worthy Back-end is running on :${PORT}`));
