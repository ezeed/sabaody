function memoize(fn) {
  const cache = new Map();
  const callback = (...args) => {
    const key = JSON.stringify(args);
    const res = cache.get(key);
    if (res !== undefined) {
      return res;
    } else {
      const solvedFn = fn(...args);
      cache.set(key, solvedFn);
      return solvedFn;
    }
  };
  return callback;
}

const memoized = memoize((n: number) => n * 2);

console.log('1', memoized(5)); // logs "computing..." → returns 10
console.log('2', memoized(5)); // no log, returns 10 from cache
console.log('3', memoized(6)); // logs "computing..." → returns 12
console.log('4', memoized(6)); // no log, returns 12 from cache
