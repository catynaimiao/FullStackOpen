import { calculateExercises as _calculateExercises } from "./calculateExercises";
import { calculateBmi as _calculateBmi } from "./calculateBmi";

export const calculateExercises = (argv: string[]) => {
  if (argv.length < 2) throw new Error("The parameters are not standardized");

  const dailyExercises: number[] = [];
  for (let i = 3; i < argv.length; i++) {
    dailyExercises.push(Number(argv[i]));
  }
  const target = Number(argv[3]);
  return _calculateExercises(dailyExercises, target);
};

export const calculateBmi = (argv: string[]) => {
  if (argv.length < 3) throw new Error("The parameters are not standardized");
  const centimeter = Number(argv[2]);
  const kilograms = Number(argv[3]);
  return _calculateBmi(centimeter, kilograms);
};
