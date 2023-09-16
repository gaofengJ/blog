let message; // 这个变量被声明了，只是值为undefined
// let age;
console.log('typeof message', typeof message);
console.log('typeof age', typeof age);

/**
 * output
 * typeof message undefined
  typeof age undefined
 */

console.log('null == undefined', null == undefined);
console.log('null === undefined', null === undefined);

const str1 = 'first line\nsecond line';
const str2 = `first line
second line`;
console.log(str1);
console.log(str2);
console.log(str1 === str2);