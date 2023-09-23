const array1 = [1, 2, 3, 4, 5];
console.log(array1.sort((a, b) => b - a)); // [5, 4, 3, 2, 1]

const colors = ['red', 'green', 'blue'];
const colorPink = 'pink';
console.log(colors.concat(colorPink)); // [ 'red', 'green', 'blue', 'pink' ]

let colors1 = ['red', 'green'];
const colors2 = (colors1.concat(['blue', 'pink']));
console.log(colors2); // [ 'red', 'green', 'blue', 'pink' ]
colors1.push('black');
console.log(colors2); // [ 'red', 'green', 'blue', 'pink' ]
