import type { Exercise } from "@/Exercise";
import { randIntInclusive } from "@/myMath";

const OPERATIONS = ["addition", "subtraction", "multiplication", "division"];
const LIMIT_ADDITION = 1000;
const LIMIT_SUBTRACTION = 1000;
const LIMIT_MULTIPLICATION = 50;
const LIMIT_DIVISION = 50;

type Parameters = {
  operation: "addition" | "subtraction" | "multiplication" | "division";
  a: number;
  b: number;
};

export type BasicArithmeticExercise = Exercise & {
  type: "basic-arithmetic";
  parameters: Parameters;
  toString: () => String;
};

function newAdditionParameters(limit: number): Parameters {
  const result = randIntInclusive(0, limit);
  const a = randIntInclusive(0, result);
  const b = result - a;
  return { operation: "addition", a: a, b: b };
}

function newSubtractionParameters(limit: number): Parameters {
  const a = randIntInclusive(0, limit);
  const b = randIntInclusive(0, a);
  const result = a - b;
  return { operation: "subtraction", a: a, b: b };
}

function newMultiplicationParameters(limit: number): Parameters {
  const a = randIntInclusive(0, limit);
  const b = randIntInclusive(0, limit);
  return { operation: "multiplication", a, b };
}

function newDivisionParameters(limit: number): Parameters {
  const result = randIntInclusive(0, limit);
  const b = randIntInclusive(0, limit);
  const a = result * b;
  return { operation: "division", a, b };
}

export function newExercise(): BasicArithmeticExercise {
  const randIndex = Math.floor(Math.random() * OPERATIONS.length);
  const operation = OPERATIONS[randIndex];
  let parameters: Parameters;
  let solution: number;
  if (operation === "addition") {
    parameters = newAdditionParameters(LIMIT_ADDITION);
    solution = parameters.a + parameters.b;
  } else if (operation === "subtraction") {
    parameters = newSubtractionParameters(LIMIT_SUBTRACTION);
    solution = parameters.a - parameters.b;
  } else if (operation === "multiplication") {
    parameters = newMultiplicationParameters(LIMIT_MULTIPLICATION);
    solution = parameters.a * parameters.b;
  } else if (operation === "division") {
    parameters = newDivisionParameters(LIMIT_DIVISION);
    solution = parameters.a / parameters.b;
  } else {
    throw new Error();
  }
  function getSolution() {
    return String(solution);
  }
  function verify(s: string) {
    return s === getSolution();
  }
  function toString() {
    const operators: Record<string, string> = {
      addition: "+",
      subtraction: "-",
      multiplication: "⋅",
      division: ":",
    };
    return (
      parameters.a +
      " " +
      operators[parameters.operation] +
      " " +
      parameters.b +
      " = "
    );
  }
  return {
    type: "basic-arithmetic",
    parameters: parameters,
    getSolution,
    verify,
    toString,
  };
}
