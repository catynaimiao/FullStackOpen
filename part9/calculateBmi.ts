import { argv } from "node:process";
import { calculateBmi } from "./utils/runHelper";
console.log(calculateBmi(argv));
