import Joi from "joi";

export const schemaPrice = Joi.object({
  shape: Joi.string()
    .valid(
      "Round",
      "Princess",
      "Heart",
      "Pear",
      "Marquise",
      "Radiant",
      "Oval",
      "Cushion"
    )
    .required()
    .messages({
      "any.only":
        "Shape must be one of: Round, Princess, Heart, Pear, Marquise, Radiant, Oval, Cushion",
    }),

  carat: Joi.number().positive().required(),

  color: Joi.string()
    .valid("D", "E", "F", "G", "H", "I", "J", "K", "L", "M")
    .required()
    .messages({
      "any.only": "Color must be one of: D, E, F, G, H, I, J, K, L, M",
    }),

  clarity: Joi.string()
    .valid(
      "FL",
      "IF",
      "VVS1",
      "VVS2",
      "VS1",
      "VS2",
      "SI1",
      "SI2",
      "I1",
      "I2",
      "I3"
    )
    .required()
    .messages({
      "any.only":
        "Clarity must be one of: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3",
    }),

  polish: Joi.string().valid("EX", "VG", "G", "F", "P").required().messages({
    "any.only": "Polish must be one of: Excellent, Very Good, Good, Fair, Poor",
  }),

  symmetry: Joi.string().valid("EX", "VG", "G", "F", "P").required().messages({
    "any.only":
      "Symmetry must be one of: Excellent, Very Good, Good, Fair, Poor",
  }),

  fluorescence: Joi.string()
    .valid("N", "F", "M", "S", "VS")
    .required()
    .messages({
      "any.only":
        "Fluorescence must be one of: None, Faint, Medium, Strong, Very Strong",
    }),
});



export const schemaSimilar = Joi.object({
  shape: Joi.string()
    .valid(
      "Round",
      "Princess",
      "Heart",
      "Pear",
      "Marquise",
      "Radiant",
      "Oval",
      "Cushion"
    )
    .required()
    .messages({
      "any.only":
        "Shape must be one of: Round, Princess, Heart, Pear, Marquise, Radiant, Oval, Cushion",
    }),

  carat: Joi.number().positive().required(),

  color: Joi.string()
    .valid("D", "E", "F", "G", "H", "I", "J", "K", "L", "M")
    .required()
    .messages({
      "any.only": "Color must be one of: D, E, F, G, H, I, J, K, L, M",
    }),

  clarity: Joi.string()
    .valid(
      "FL",
      "IF",
      "VVS1",
      "VVS2",
      "VS1",
      "VS2",
      "SI1",
      "SI2",
      "I1",
      "I2",
      "I3"
    )
    .required()
    .messages({
      "any.only":
        "Clarity must be one of: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3",
    }),


});
