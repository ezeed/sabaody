// First approach

// function LFUCache(limit: number) {
//   const cache = new Map();

//   function get(n: number) {
//     const current = cache.get(n);
//     if (current !== undefined) {
//       cache.set(n, { value: n, count: current.count + 1 });
//       return current.value;
//     }
//   }

//   function set(n: number) {
//     const current = cache.get(n);

//     if (current?.value === n) {
//       cache.set(n, {
//         value: n,
//         count: current.count + 1,
//       });
//       return;
//     }

//     if (cache.size < limit) {
//       cache.set(n, {
//         value: n,
//         count: current === undefined ? 0 : current.count + 1,
//       });
//     } else {
//       const keyToDelete = { value: null, count: null };
//       cache.forEach(ca => {
//         if (keyToDelete.count === null || ca.count < keyToDelete.count) {
//           keyToDelete.count = ca.count;
//           keyToDelete.value = ca.value;
//         }
//       });
//       cache.delete(keyToDelete.value);
//       cache.set(n, {
//         value: n,
//         count: 0,
//       });
//     }
//   }
//   return {
//     cache,
//     get,
//     set,
//   };
// }

// const luc = LFUCache(5);

// luc.set(1);
// luc.get(1);
// luc.get(1);

// luc.set(2);
// luc.get(2);
// luc.get(2);

// luc.set(3);

// luc.set(4);
// luc.get(4);

// luc.set(5);
// luc.get(5);
// luc.get(5);

// luc.set(6);
// luc.get(6);
// luc.get(6);

// luc.set(7);
// luc.get(7);
// luc.get(7);

// luc.set(8);
// luc.get(8);
// luc.get(8);

// console.log(luc.cache);
