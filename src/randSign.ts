function randSign() {
  if (Math.random() > 0.5) {
    return 1;
  }
  return -1;
}

export { randSign };
