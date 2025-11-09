import express from "express";
import cors from "cors";
import logger from "../logger/winstonLogging.js";
import pricingRouter from "../routes/pricingRouter.js";
import { errorHandler } from "../errors/errors.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3500;

const FRONTEND = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const corsOptions = {
  origin: FRONTEND,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());

app.use("/price", pricingRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use((req, res) => {
  res.status(404).send(`path ${req.path} is not found`);
});

app.use(errorHandler);
app.listen(PORT, () => logger.info(`Worthy Back-end is running on :${PORT}`));
