import express from "express";
import { validator } from "../middleware/validation.js";
import { schemaPrice, schemaSimilar } from "../validation/pricingSchema.js";
import { PricingService } from "../service/pricingService.js";
import logger from "../logger/winstonLogging.js";

const pricingRouter = express.Router();

pricingRouter.post("/calculate", validator(schemaPrice), (req, res) => {
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
  logger.info(`Price calculated :${price.price}`);
  res.status(200).json(price);
});

pricingRouter.post(
  "/similar",
  validator(schemaSimilar),
  async (req, res, next) => {
    try {
      const { shape, carat, color, clarity } = req.body;

      const items = await new PricingService().getSimilar({
        shape,
        carat,
        color,
        clarity,
      });

      logger.info(`🔁 Similar diamonds returned: ${items.length}`);
      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  }
);

export default pricingRouter;
