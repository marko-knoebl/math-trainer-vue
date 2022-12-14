import type { Exercise } from "@/Exercise";
import { randChoice, range } from "@/myMath";
import { randIntInclusive } from "@/myMath";

type Parameters = {
  coeffLeft: number;
  constLeft: number;
  coeffRight: number;
  constRight: number;
};
type EquationsExercise = Exercise & {
  type: "foo";
  parameters: Parameters;
  toString: () => String;
};

export function newExercise(): EquationsExercise {
  const x = randIntInclusive(1, 10);
  const coeffLeft = randIntInclusive(1, 10);
  const constLeft = randIntInclusive(1, 10);
  const coeffRightOptions = [
    ...range(1, coeffLeft),
    ...range(coeffLeft + 1, 10 + 1),
  ];
  const coeffRight = randChoice(coeffRightOptions);
  const constRight = coeffLeft * x + constLeft - coeffRight * x;

  function getSolution() {
    return String(x);
  }
  function verify(s: string) {
    return s === getSolution();
  }
  function toString() {
    return `${coeffLeft}x + ${constLeft} = ${coeffRight}x + ${constRight}`;
  }

  return {
    type: "foo",
    parameters: { coeffLeft, constLeft, coeffRight, constRight },
    getSolution,
    verify,
    toString,
  };
}
