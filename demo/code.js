/**
 * 节流
 */

function throttle(fn, delay) {
  let activeTime = 0;
  // 箭头函数版本：this 绑定到定义时的上下文，可能导致意外的上下文问题。
  // 普通函数版本：this 动态绑定到调用者，更通用且符合多数使用场景。
  return function (...args) {
    const curTime = Date.now();
    if (curTime - activeTime > delay) {
      fn.apply(this, args); // this 是调用时上下文
      activeTime = curTime;
    }
  };
}

const throttleFn = (msg) => {
  console.log(msg);
};

const throttledFn = throttle(throttleFn, 500);

/**
 * 防抖
 */
function debounce(fn, delay) {
  let timer = null; // 通过闭包缓存一个定时器id
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debounceFn = (msg) => {
  console.log(msg);
};

const debouncedFn = debounce(debounceFn, 500);

/**
 * Promise.all
 */
// eslint-disable-next-line no-extend-native
Promise.prototype.all = (promises) => new Promise((resolve, reject) => {
  const results = [];
  let complete = 0;

  promises.forEach((promise, index) => {
    Promise.resolve(promise).then((value) => {
      results[index] = value;
      complete += 1;
      if (complete === promises.length) {
        resolve(results);
      }
    }).catch(reject);
  });
});

/**
 * Promise.race
 */
// eslint-disable-next-line no-extend-native
Promise.prototype.race = (promises) => new Promise((resolve, reject) => {
  promises.forEach((promise) => {
    Promise.resolve(promise).then((val) => resolve(val)).catch(reject);
  });
});

/**
 * Promise.finally
 */
// eslint-disable-next-line no-extend-native
Promise.prototype.finally = (callback) => {
  const constructor = this.constructor;
  return this.then(
    (value) => constructor.resolve(callback()).then(() => value),
    (reason) => constructor.resolve(callback()).then(() => { throw reason; }),
  );
};

/**
 * 对象深拷贝
 */
const deepCopyDFS = (obj, map = new Map()) => {
  if (typeof obj === 'object' || obj === null) return obj;
  if (map.has(obj)) return map.get(obj);

  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopyDFS(obj[key], map);
    }
  }

  return copy;
};

/**
 * 数组扁平化去并除其中重复部分数据
 */
const flatenUniqueSortFn = (arr) => Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);

/**
 * 实现 new
 */
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}

/**
 * 合并数组
 */
function combineArray() {
  const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
  const arr2 = ['A', 'B', 'C', 'D'];
  const ret = [];
  for (let i = 0; i < arr2.length; i++) {
    ret.push(...arr1.slice(2 * i, 2 * (i + 1)));
    ret.push(arr2[i]);
  }
  return ret;
}

/**
 * 使用迭代的方式实现 flatten 函数
 */
const flatten = (arr, ret = []) => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatten([...arr[i]], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
};

/**
 * sleep
 */
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * 月度销售额对象转数组
 */
const formatMonthlySalesData = (obj) => {
  const ret = new Array(12).fill(null);
  for (let i = 0; i < Object.keys(obj).length; i++) {
    ret[Object.keys(obj)[i] - 1] = obj[Object.keys(obj)[i]];
  }
  return ret;
};

/**
 * 给定数组，计算交集
 */
const intersect = (nums1, nums2) => {
  const obj = {};
  const ret = [];

  for (let i = 0; i < nums1.length; i++) {
    obj[nums1[i]] = (obj[nums1] || 0) + 1;
  }

  for (let i = 0; i < nums2.length; i++) {
    if (obj[nums2[i]]) {
      ret.push(nums2[i]);
      obj[nums2[i]]--;
    }
  }
  return ret;
};

/**
 * 大小写互转
 */
const invertCase = (str) => {

};
