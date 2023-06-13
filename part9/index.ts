import express from "express";
import { Request } from "express";
import { calculateBmi } from "./utils/calculateBmi";
import { calculateExercises } from "./utils/calculateExercises";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.status(200).send("Hello Full Stack!");
});

app.get("/bmi", (req: Request<{ height: string; weight: string }>, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!(height && weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
  const bmi = calculateBmi(height, weight);
  return res.json({ height, weight, bmi });
});

app.post(
  "/exercises",
  (req: Request<{ daily_exercises: number[]; target: number }>, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!(daily_exercises && target)) {
      return res.status(400).json({
        error: "parameters missing",
      });
    }

    if (!Array.isArray(daily_exercises)) {
      return res.status(400).json({
        error: "malformatted parameters",
      });
    }

    if (isNaN(Number(target))) {
      return res.status(400).json({
        error: "malformatted parameters",
      });
    }

    for (let i = 0; i < daily_exercises.length; i++) {
      if (isNaN(Number(daily_exercises[i]))) {
        return res.status(400).json({
          error: "malformatted parameters",
        });
      }
    }

    const result = calculateExercises(
      daily_exercises.map((e) => Number(e)),
      Number(target)
    );
    return res.json(result);
  }
);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
