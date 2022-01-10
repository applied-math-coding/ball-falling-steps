export function* enumerate_climbing_stairs(n: number): Generator<number[]> {
  if (n === 1) {
    yield [1];
  }
  if (n === 2) {
    yield [1, 1];
    yield [2];
  }
  if (n > 2) {
    for (let i = 1; i < n; i++) {
      for (let s of enumerate_climbing_stairs(n - i)) {
        s.unshift(i);
        yield s;
      }
    }
  }
}