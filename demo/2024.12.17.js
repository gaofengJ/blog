/* eslint-disable no-promise-executor-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable symbol-description */
/* eslint-disable no-extend-native */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */

function throttle(fn, delay) {
  let activeTime = 0;
  return function (...args) {
    const curTime = Date.now();
    if (curTime - activeTime > delay) {
      fn.apply(this, args);
      activeTime = curTime;
    }
  };
}

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        results[index] = value;
        completed += 1;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}

function promiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        results[index] = value;
      }).catch((reason) => {
        results[index] = reason;
      }).finally(() => {
        completed += 1;
        if (completed === promises.length) resolve(results);
      });
    });
  });
}

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(resolve).catch((reason) => {
        errors[index] = reason;
        completed += 1;
        if (completed === promises.length) reject(errors);
      });
    });
  });
}

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}

Promise.finally = function (callback) {
  const constructor = this.constructor;
  return this.then(
    (value) => constructor.resolve(callback()).then(() => value),
    (reason) => constructor.resolve(callback()).then(() => { throw reason; }),
  );
};

function deepCloneDFS(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (map.has(obj)) return map.get(obj);

  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = deepCloneDFS(obj[key], map);
    }
  }
  return copy;
}

Function.prototype.call = function (context, ...args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.apply = function (context, args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.bind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    fn.apply(context, [...args, ...newArgs]);
  };
};

function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}

function flatten(arr, ret = []) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatten([...arr[i]], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
}

const sleep = (time) => new Promise((resolve, reject) => {
  setTimeout(resolve, time);
});

class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  addTask(task) {
    this.queue.push(task);
    return this;
  }

  addTaskFirst(task) {
    this.queue.unshift(task);
    return this;
  }

  next() {
    if (this.queue.length) {
      const task = this.queue.shift();
      task();
    }
  }

  eat(food) {
    return this.addTask(() => {
      console.log(`I am eating ${food}`);
      this.next();
    });
  }

  sleep(time) {
    return this.addTask(() => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time * 1000);
    });
  }

  sleepFirst(time) {
    return this.addTaskFirst(() => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time * 1000);
    });
  }
}

function lazyMan(name) {
  return new LazyManClass(name);
}

// const add = (...args) => {
//   let sum = args.reduce((accu, val) => accu + val, 0);

//   const innerAdd = (...newArgs) => {
//     sum += newArgs.reduce((accu, val) => accu + val, 0);
//     return innerAdd;
//   };

//   innerAdd.ValueOf = () => sum;
//   innerAdd.toString = () => sum;

//   return innerAdd;
// };

function add(...args) {
  let sum = args.reduce((accu, val) => accu + val, 0);

  const innerAdd = (...newArgs) => {
    sum += newArgs.reduce((accu, val) => accu + val, 0);
    return innerAdd;
  };

  innerAdd.valueOf = () => sum;
  innerAdd.toString = () => sum;

  return innerAdd;
}

function convertListToTree(list) {
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
    if (node.pareneId === 0) {
      ret.push(node);
      continue;
    }
    if (map.has(node.pareneId)) {
      map.get(node.pareneId).children.push(node);
    }
  }
}

const highlight = (str, keyword) => {
  const pattern = new RegExp(keyword, 'g');
  return str.replace(pattern, `<b>${keyword}</b>`);
};

function findPathInTree(tree, value) {
  const path = [];
  const dfs = (nodes, target) => {
    for (let i = 0; i < nodes.length; i++) {
      path.push(nodes[i].id);
      if (nodes[i].id === target) return path;
      if (nodes[i].cildren) {
        const result = dfs(nodes[i].children, target);
        if (result.length) return result;
      }
      path.pop();
    }
    return [];
  };

  return dfs(tree, value);
}

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

  offAll(event) {
    if (this.events.has(event)) {
      this.events.delete(event);
    }
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

function myInstanceof(obj, constructor) {
  let prototype = Object.getPrototypeOf(obj);

  while (prototype) {
    if (prototype === constructor.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}

// Array.prototype.myReduce = function (callback, initial) {
//   let accu = initial;
//   let startIndex = 0;

//   if (accu === undefined) {
//     accu = this[0];
//     startIndex = 1;
//   }

//   for (let i = startIndex; i < this.length; i++) {
//     accu = callback(accu, this[i], i, this);
//   }
//   return accu;
// };

Array.prototype.myReduce = function (callback, initial) {
  let accu = initial;
  let startIndex = 0;

  if (accu === undefined) {
    accu = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accu = callback(accu, this[i], i, this);
  }

  return accu;
};

class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.limit = limit;
    this.running = 0;
  }

  addTask(promiseCreator) {
    return new Promise((resolve, reject) => {
      const task = () => {
        promiseCreator().then(resolve).catch(reject).finally(() => {
          this.running--;
          this.next();
        });
      };
      this.queue.push(task);
      this.next();
    });
  }

  next() {
    if (this.running < this.limig && this.queue.length) {
      const task = this.queue.shift();
      task();
      this.running++;
    }
  }
}

const compareVersions = (version1, version2) => {
  const arr1 = version1.split('.').map((i) => +i);
  const arr2 = version2.split('.').map((i) => +i);

  const maxLen = Math.max(arr1, arr2);

  for (let i = 0; i < maxLen; i++) {
    const num1 = arr1[i] || 0;
    const num2 = arr2[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
};

const sortVersions = (versions) => versions.sort(compareVersions);

const versions = ['0.0.1', '0.2.2', '1.0.0', '0.1.2'];
const sortedVersions = sortVersions(versions);

function isPromise(obj) {
  return (obj instanceof Promise || obj !== null && typeof obj === 'object' && typeof obj.next === 'function');
}

// function get(obj, path, defaultValue) {
//   const keys = Array.isArray(path) ? path : path.replace('[', '.').replace(']').split('.');
//   let result = obj;

//   for (const key of keys) {
//     if (result === null || !(key in result)) {
//       return defaultValue;
//     }
//     result = result[key];
//   }

//   return result === undefined ? defaultValue : result;
// }

function get(obj, path, defaultValue) {
  const keys = Array.isArray(path) ? path : path.repalce('[', '.').replace(']').split('.');

  let result = obj;

  for (let i = 0; i < keys.length; i++) {
    if (result === null || !(keys[i] in result)) {
      return defaultValue;
    }
    result = result[keys[i]];
  }

  return result === undefined ? defaultValue : result;
}

function bubbleSort(arr) {
  let swapped = true;
  let n = arr.length;
  if (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swapped = true;
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = arr[i];
      }
    }
    n--;
  }
  return arr;
}

function quickSort(arr) {
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

const merge = (left, right) => {
  const ret = [];
  let l = 0;
  let r = 0;
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      ret.push(left[l]);
      l++;
    } else {
      ret.push(right[r]);
      r--;
    }
  }
  return [...ret, left.slice(l), right.slice(r)];
};

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
