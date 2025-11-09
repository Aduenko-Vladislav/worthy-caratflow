import { mongoConnection } from "../db/MongoConnection.js";
import logger from "../logger/winstonLogging.js";

const COLLECTION = process.env.MONGO_COLLECTION || "diamonds";
class PricingService {
  #diamonds;

  constructor() {
    this.#diamonds = mongoConnection.getCollection(COLLECTION);
  }

  static shapeMultipliers = {
    Round: 1.2,
    Princess: 1.1,
    Heart: 1.15,
    Pear: 1.1,
    Marquise: 1.05,
    Radiant: 1.08,
    Oval: 1.1,
    Cushion: 1.05,
  };

  static colorMultipliers = {
    D: 1.5,
    E: 1.4,
    F: 1.3,
    G: 1.2,
    H: 1.1,
    I: 1.0,
    J: 0.9,
    K: 0.8,
    L: 0.7,
    M: 0.6,
  };

  static clarityMultipliers = {
    FL: 2.0,
    IF: 1.8,
    VVS1: 1.6,
    VVS2: 1.5,
    VS1: 1.3,
    VS2: 1.2,
    SI1: 1.1,
    SI2: 1.0,
    I1: 0.8,
    I2: 0.6,
    I3: 0.4,
  };

  static polishMultipliers = {
    EX: 1.1,
    VG: 1.05,
    G: 1.0,
    F: 0.95,
    P: 0.9,
  };

  static symmetryMultipliers = {
    EX: 1.1,
    VG: 1.05,
    G: 1.0,
    F: 0.95,
    P: 0.9,
  };

  static fluorescenceMultipliers = {
    N: 1.0,
    F: 0.98,
    M: 0.95,
    S: 0.9,
    VS: 0.85,
  };

  static calculatePrice({
    shape,
    carat,
    color,
    clarity,
    polish,
    symmetry,
    fluorescence,
  }) {
    const basePrice = carat * 10000;

    const shapeMultiplier = this.shapeMultipliers[shape] || 1.0;
    const colorMultiplier = this.colorMultipliers[color] || 1.0;
    const clarityMultiplier = this.clarityMultipliers[clarity] || 1.0;
    const polishMultiplier = this.polishMultipliers[polish] || 1.0;
    const symmetryMultiplier = this.symmetryMultipliers[symmetry] || 1.0;
    const fluorescenceMultiplier =
      this.fluorescenceMultipliers[fluorescence] || 1.0;

    const finalPrice =
      basePrice *
      shapeMultiplier *
      colorMultiplier *
      clarityMultiplier *
      polishMultiplier *
      symmetryMultiplier *
      fluorescenceMultiplier;

    return {
      price: Math.round(finalPrice * 100) / 100,
      currency: "USD",
      shape,
      carat,
      color,
      clarity,
      polish,
      symmetry,
      fluorescence,
    };
  }

  async getSimilar({ shape, carat, color, clarity }, { limit = 4, caratTolerance = 0.1 } = {}) {
    const tryOnce = async (opts) => {
      const { tol, dropClarity } = opts;
      const caratMin = carat * (1 - tol);
      const caratMax = carat * (1 + tol);
      const match = {
        shape,
        color,
        ...(dropClarity ? {} : { clarity }),
        carat: { $gte: caratMin, $lte: caratMax },
      };
  
      const pipeline = [
        { $match: match },
        { $addFields: { _caratDiff: { $abs: { $subtract: ["$carat", carat] } } } },
        { $sort: { _caratDiff: 1, priceUSD: 1 } },
        { $project: { _caratDiff: 0 } },
        { $limit: limit },
      ];
      return this.#diamonds.aggregate(pipeline).toArray();
    };
  
 
    let items = await tryOnce({ tol: caratTolerance, dropClarity: false });
    if (items.length) return items;
  
    items = await tryOnce({ tol: 0.2, dropClarity: false });
    if (items.length) return items;
  

    items = await tryOnce({ tol: 0.2, dropClarity: true });
    return items;
  }
}

export { PricingService };
