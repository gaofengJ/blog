for (var i = 0; i < 5; i++) {
  console.log('inner i', i);
}
console.log('outer i', i);

/**
 * output
 * inner i 0
  inner i 1
  inner i 2
  inner i 3
  inner i 4
  outer i 5
 */

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log('inner i', i);
  });
}

console.log('outer i', i);

/**
 * output
 * outer i 5
  inner i 5
  inner i 5
  inner i 5
  inner i 5
  inner i 5
 */

/**
 *  之所以会这样，是因为在退出循环时，迭代变量保存的是导致循环退出的值：5。在之后执行超时
逻辑时，所有的i 都是同一个变量，因而输出的都是同一个最终值。
而在使用let 声明迭代变量时，JavaScript 引擎在后台会为每个迭代循环声明一个新的迭代变量。
每个setTimeout 引用的都是不同的变量实例，所以console.log 输出的是我们期望的值，也就是循
环执行过程中每个迭代变量的值。
  */
