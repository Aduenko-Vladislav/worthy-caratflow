class PricingService {
  //Shape
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

  // Color
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

  // Clarity
  static clarityMultipliers = {
    FL: 2.0, // Flawless
    IF: 1.8, // Internally Flawless
    VVS1: 1.6, // Very Very Slightly Included 1
    VVS2: 1.5, // Very Very Slightly Included 2
    VS1: 1.3, // Very Slightly Included 1
    VS2: 1.2, // Very Slightly Included 2
    SI1: 1.1, // Slightly Included 1
    SI2: 1.0, // Slightly Included 2
    I1: 0.8, // Included 1
    I2: 0.6, // Included 2
    I3: 0.4, // Included 3
  };

  // Polish
  static polishMultipliers = {
    Ex: 1.1,
    VG: 1.05,
    G: 1.0,
    F: 0.95,
    P: 0.9,
  };

  // Symmetry
  static symmetryMultipliers = {
    Ex: 1.1,
    VG: 1.05,
    G: 1.0,
    F: 0.95,
    P: 0.9,
  };

  // Fluorescence
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
    const basePrice = carat * 10000; // base price

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
      shape,
      carat,
      color,
      clarity,
      polish,
      symmetry,
      fluorescence,
    };
  }
}

export { PricingService };
