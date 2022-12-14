function randIntInclusive(arg0: number, arg1: number) {
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

function randInt(range: number) {
  return Math.floor(Math.random() * range);
}

export { randIntInclusive, randInt };
