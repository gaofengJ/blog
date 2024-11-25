/**
 * 节流
 */

// eslint-disable-next-line max-classes-per-file
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
  let ret = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= 'a' && str <= 'z') {
      ret += str[i].toUpperCase();
    }
    if (str[i] >= 'A' && str[i] <= 'Z') {
      ret += str[i].toLowerCase();
    }
  }
  return ret;
};

/**
 * 字符串匹配
 */
const myIndexOf = (s, t) => {
  if (t.length > s.length) return -1;
  for (let i = 0; i <= s.length - t.length; i++) {
    if (s.slice(i, i + t.length) === t) return i;
  }
  return -1;
};

/**
 * 使用 proxy 实现简单的数据绑定
 */

const htmlOfProxy = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Proxy</title>
</head>
<body>
<input type="text" id="input">
<div id="output"></div>
</body>
<script>
const data = {
  text: '',
};

const handler = {
  set(target, key, value) {
    target[key] = value;
    document.getElementById('output').textContent = value;
    return true;
  }
};

const proxy = new Proxy(data, handler);

document.getElementById('input').addEventListener('input', () => {
  proxy.title = this.value;
})

</script>
</html>
`;

/**
 * 打印 1~1000之间所有对称数
 */
const isPalindrome = (number) => {
  const str = `${number}`;
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
};

const printPalindromeNumbers = () => {
  for (let i = 0; i <= 10000; i++) {
    if (isPalindrome(i)) {
      console.log(i);
    }
  }
};

/**
 * list 转 Tree
 */
const convertListToTree = (list) => {
  const map = new Map();
  const ret = [];

  for (let i = 0; i < list.length; i++) {
    map.set(list[i].id, {
      ...list[i],
      children: [],
    });
  }

  for (let i = 0; i < list.length; i++) {
    const node = map.get(list[i].id);
    if (node.parentId === 0) {
      ret.push(node);
    } else if (map.has(node.parentId)) {
      map.get(list[i].parentId).children.push(node);
    }
  }

  return ret;
};

/**
 * 模糊搜索结果高亮
 */
const highlight = (str, keyword) => {
  const pattern = new RegExp(keyword, 'g');
  return str.replace(pattern, `<b style=color: #FF0000;>${keyword}</b>`);
};

/**
 * Tree 中找到所有父级 id
 */
const findPathInTree = (tree, value) => {
  const path = [];

  const dfs = (nodes, target) => {
    for (let i = 0; i < nodes.length; i++) {
      path.push(nodes[i].id);

      if (nodes[i].id === target) return path;
      if (nodes[i].children) {
        const result = dfs(nodes[i].children, target);
        if (result.length > 0) return result;
      }
      path.pop();
    }
    return [];
  };

  return dfs(tree, value);
};

/**
 * 寻找 nums1 和 nums2 的中位数，时间复杂度 O(log(m + n))
 */
const findMedianSortedArrays = (nums1, nums2) => {
  const arr = [...nums1, ...nums2];
  const sortedArr = arr.sort((a, b) => a - b);
  const midIndex = Math.floor(sortedArr.length / 2);
  if (sortedArr.length % 2) {
    return sortedArr[midIndex];
  }
  return (sortedArr[midIndex - 1] + sortedArr[midIndex]) / 2;
};

/**
 * 返回 Int 逆序后的字符串
 */
const reverseInt = (n) => {
  // 将整数转化为字符串
  const str = `${n}`;

  return str.split('').reverse().join('');
};

/**
 * EventBus
 */
class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).push(listener);
    } else {
      this.events.set(event, [listener]);
    }
  }

  off(event, listener) {
    if (!this.events.has(event)) return;
    this.events.set(event, this.events.get(event).filter((l) => l !== listener));
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach((l) => l.apply(this, args));
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

/**
 * 实现 instanceOf
 */

const myInstanceOf = (obj, constructor) => {
  let prototype = Object.getPrototypeOf(obj);

  while (prototype) {
    if (prototype === constructor.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }

  return false;
};

/**
 * 实现 reduce
 */
// eslint-disable-next-line no-extend-native
Array.prototype.myReduce = (callback, initial) => {
  let accu = initial;
  let startIndex = 0;

  if (accu === undefined) {
    accu = this[0];
    startIndex = 1;
  }

  for (let i = 0; i < this.length; i++) {
    accu = callback(accu, this[i], i, this);
  }

  return accu;
};

/**
 * 带并发的异步调度器 Scheduler
 */
class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.running = 0;
  }

  addTask(promiseCreate) {
    return new Promise((resolve, reject) => {
      const task = promiseCreate().then(resolve).catch(reject).finally(() => {
        this.running--;
        this.next();
      });
      this.queue.push(task);
      this.next();
    });
  }

  next() {
    if (this.running < this.limit && this.queue.length) {
      const task = this.queue.shift();
      this.running++;
      task();
    }
  }
}

/**
 * 判断网址是否正确
 */
const isUrl = (url) => {
  try {
    const tempUrl = new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};
