export type Exercise = {
  type: string;
  parameters: Record<string, number | string>;
  verify: (answer: string) => boolean;
  getSolution: () => string;
};
