// tienes que implementar dos metodos:
// add(n: int) -> Toma un entero y lo agrega a una coleccion
// check(x:int) -> Toma un entero y tiene que devolver True si existen dos enteros a y b que
// fueron previamente agregados usando add() tal que a + b = x. False de lo contrario

// const collection = [];

// function add(n: number) {
//   collection.push(n);
// }

// function check(int: number) {
//   for (let index = 0; index < collection.length; index++) {
//     const element = collection[index];
//     for (let index2 = 0; index2 < collection.length; index2++) {
//       if (index !== index2) {
//         const subElement = collection[index2];
//         if (element + subElement === int) {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// }

const collection = new Set<number>();
const numbersEntered = [];
function add(n: number) {
  if (numbersEntered.length > 0) {
    numbersEntered.forEach(ne => collection.add(n + ne));
  }
  numbersEntered.push(n);
}

function check(int: number) {
  return collection.has(int);
}

add(1);
add(2);
add(3);
add(4);
add(5);

console.log(collection);
console.log('2 ->', check(2));
console.log('3 ->', check(3));
console.log('9 ->', check(9));
console.log('12 ->', check(12));
