export const SHAPES = [
    { value: "Round", label: "Round Brilliant" },
    { value: "Princess", label: "Princess Cut" },
    { value: "Oval", label: "Oval Cut" },
    { value: "Cushion", label: "Cushion Cut" },
    { value: "Emerald", label: "Emerald Cut" },
    { value: "Pear", label: "Pear Cut" },
    { value: "Marquise", label: "Marquise Cut" },
    { value: "Heart", label: "Heart Cut" },
  ];
  
  export const COLORS = [
    { value: "D", label: "D (Colorless)" },
    { value: "E", label: "E (Colorless)" },
    { value: "F", label: "F (Colorless)" },
    { value: "G", label: "G (Near Colorless)" },
    { value: "H", label: "H (Near Colorless)" },
    { value: "I", label: "I (Slightly Tinted)" },
    { value: "J", label: "J (Slightly Tinted)" },
  ];
  
  export const CLARITIES = [
    { value: "IF", label: "Internally Flawless (IF)" },
    { value: "VVS1", label: "Very Very Slightly Included (VVS1)" },
    { value: "VVS2", label: "Very Very Slightly Included (VVS2)" },
    { value: "VS1", label: "Very Slightly Included (VS1)" },
    { value: "VS2", label: "Very Slightly Included (VS2)" },
    { value: "SI1", label: "Slightly Included (SI1)" },
    { value: "SI2", label: "Slightly Included (SI2)" },
    { value: "I1", label: "Included (I1)" },
  ];
  
  export const GRADES = [
    { value: "EX", label: "Excellent" },
    { value: "VG", label: "Very Good" },
    { value: "G", label: "Good" },
    { value: "F", label: "Fair" },
  ];
  
  export const FLUORESCENCE = [
    { value: "N", label: "None" },
    { value: "F", label: "Faint" },
    { value: "M", label: "Medium" },
    { value: "S", label: "Strong" },
    { value: "VS", label: "Very Strong" },
  ];
  
  export const getLabel = (list, value) =>
    (list.find((i) => i.value === value)?.label) ?? value;
  