// Problem: Implement curry
// Transform a function that takes multiple arguments into a chain of functions that each take one argument at a time.

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args); // enough args → call fn
    } else {
      return (
        ...nextArgs // not enough → return function that
      ) => curried(...args, ...nextArgs); // calls curried with accumulated args
    }
  };
}

function add(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // → 6
console.log(curriedAdd(1)(2)); // → function waiting for c
console.log(curriedAdd(1)); // → function waiting for b and c

// More test cases:
// const multiply = curry((a: number, b: number) => a * b);
// multiply(3)(4); // → 12

// const add5 = curriedAdd(5)  // partial application
// add5(3)(2)       // → 10
// add5(10)(1)      // → 16
// Constraints:

// Must work with any function regardless of how many arguments it takes
// Each step can receive one argument and returns either a new function or the final result
// Hint: fn.length tells you how many arguments a function expects

// That last hint is the key to knowing when to call fn vs when to return another waiting function. Go. 🐝
