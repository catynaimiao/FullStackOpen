export interface exercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExercises: number[],
  target: number
): exercisesResult => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((hours) => hours > 0).length;
  const totalHours = dailyExercises.reduce((acc, hours) => acc + hours, 0);
  const averageHours = totalHours / periodLength;
  const success = averageHours >= target;

  let rating = 1;
  if (averageHours >= target * 0.9) {
    rating = 3;
  } else if (averageHours >= target * 0.75) {
    rating = 2;
  }

  const ratingDescription =
    {
      1: "Needs improvement",
      2: "Doing good",
      3: "Excellent",
    }[rating] || "";

  const results = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average: averageHours,
  };

  return results;
};
