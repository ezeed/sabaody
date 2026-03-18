function debounce(fn, time: number) {
  let timer;
  const callback = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, time);
  };
  return callback;
}

const debounced = debounce((name: string) => {
  console.log(`Hello ${name}`);
}, 300);

debounced('Alice'); // called at 0ms
debounced('Bob'); // called at 100ms — resets timer
debounced('Charlie'); // called at 200ms — resets timer

// // only fires once at 500ms → "Hello Charlie"
// const results = [];
// const log = debounce((val: string) => results.push(val), 100);
// log('a');
// log('b');
// log('c');
// setTimeout(() => console.log(results), 200); // → ['c']

// // Test 2 — fires again after delay passes
// log('x');
// setTimeout(() => log('y'), 200); // enough time passed, both fire
// setTimeout(() => console.log(results), 500); // → ['x', 'y']
