// Problem: Implement throttle
// Write a function throttle(fn, delay) that returns a new function that invokes fn at most once every delay milliseconds, no matter how many times it's called.

function throttle(fn, delay) {
  let lastCall = 0;
  const callback = (...args) => {
    const elapsed = Date.now() - lastCall;
    if (elapsed >= delay) {
      fn(...args);
      lastCall = Date.now();
    } else {
      console.log('ignore');
    }
  };
  return callback;
}

const throttled = throttle((name: string) => {
  console.log(`Hello ${name}`);
}, 300);

throttled('Alice'); // t=0ms   → fires
setTimeout(() => throttled('Bob'), 100); // t=100ms → ignored
setTimeout(() => throttled('Charlie'), 200); // t=200ms → ignored
setTimeout(() => throttled('David'), 400); // t=400ms → fires

// **The key difference from debounce:**
// ```
// debounce  → waits until you STOP calling, then fires once
// throttle  → fires immediately, then IGNORES calls for X ms, then fires again
// Real world use case:
// typescript// scroll event — fires max once per 300ms no matter how fast user scrolls
// window.addEventListener('scroll', throttle(handleScroll, 300))
// Constraints:

// No external libraries
// First call must fire immediately
// Subsequent calls within the delay window are ignored
// After the window passes, next call fires immediately again

// Hint to get started: instead of storing a timer reference like debounce, think about what single piece of state tells you whether you're currently "in the window" or not. 👀
