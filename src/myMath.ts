export function randChoice<Type>(arr: Array<Type>): Type {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function range(arg0: number, arg1?: number): Array<number> {
  let lower;
  let upper;
  if (arg1 !== undefined) {
    lower = arg0;
    upper = arg1;
  } else {
    lower = 0;
    upper = arg0;
  }
  const arr = [];
  for (let i = lower; i < upper; i++) {
    arr.push(i);
  }
  return arr;
}

export function randIntInclusive(arg0: number, arg1: number) {
  let min;
  let max;
  if (arg1 === undefined) {
    min = 1;
    max = arg0;
  } else {
    min = arg0;
    max = arg1;
  }
  const range = max - min + 1;
  const result = Math.floor(Math.random() * range) + min;
  return result;
}

export function randInt(range: number) {
  return Math.floor(Math.random() * range);
}

export function randSign() {
  if (Math.random() > 0.5) {
    return 1;
  }
  return -1;
}
