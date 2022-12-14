import type { Exercise } from "@/Exercise";
import { randIntInclusive } from "@/randInt";

type Parameters = {
  coeffLeft: number;
  constLeft: number;
  constRight: number;
};

type EquationsExercise = Exercise & {
  type: "equations";
  parameters: Parameters;
  toString: () => String;
};

export function newExercise(): EquationsExercise {
  const x = randIntInclusive(-10, 10);
  const coeffLeft = randIntInclusive(1, 10);
  const constLeft = randIntInclusive(0, 10);
  const constRight = x * coeffLeft + constLeft;
  const parameters = { coeffLeft, constLeft, constRight };
  function getSolution() {
    return String(x);
  }
  function verify(s: string) {
    return s === getSolution();
  }
  function toString() {
    return `${coeffLeft}x + ${constLeft} = ${constRight}`;
  }
  return {
    type: "equations",
    parameters,
    getSolution,
    verify,
    toString,
  };
}
