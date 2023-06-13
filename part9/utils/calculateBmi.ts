export const calculateBmi = (centimeter: number, kilograms: number): string => {
  if (centimeter <= 0) {
    throw Error("centimeter must be a positive integer");
  }
  if (kilograms <= 0) {
    throw Error("kilograms must be a positive integer");
  }

  const BMI = kilograms / ((centimeter / 100) * (centimeter / 100));

  if (BMI > 30.0) {
    return "Obese";
  }
  if (BMI > 25.0) {
    return "Overweight";
  }
  if (BMI > 18.5) {
    return "Normal";
  }
  return "Underweight";
};

