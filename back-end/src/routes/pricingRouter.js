import express from "express";
import { validator } from "../middleware/validation.js";
import { schemaPrice } from "../validation/pricingSchema.js";
import { PricingService } from "../service/pricingService.js";

const pricingRouter = express.Router();

pricingRouter.post("/price", validator(schemaPrice), (req, res) => {
  const { shape, carat, color, clarity, polish, symmetry, fluorescence } =
    req.body;
  const price = PricingService.calculatePrice({
    shape,
    carat,
    color,
    clarity,
    polish,
    symmetry,
    fluorescence,
  });
  res.status(200).json(price);
});

export default pricingRouter;
