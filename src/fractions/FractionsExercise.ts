import type { Exercise } from "@/Exercise";

export type FractionsMultiplicationExercise = Exercise & {
  type: "fractions/multiplication";
  parameters: {
    numA: number;
    denA: number;
    numB: number;
    denB: number;
  };
};

export function newExercise(): FractionsMultiplicationExercise {
  const numA = Math.ceil(Math.random() * 10);
  const denA = Math.ceil(Math.random() * 10);
  const numB = Math.ceil(Math.random() * 10);
  const denB = Math.ceil(Math.random() * 10);
  return {
    type: "fractions/multiplication",
    parameters: { numA, denA, numB, denB },
    verify: (answer: string) => {
      const [num, den] = answer.split("/");
      if (numA * numB === Number(num) && denA * denB === Number(den)) {
        return true;
      }
      return false;
    },
    getSolution() {
      return `${numA * numB}/${denA * denB}`;
    },
  };
}
