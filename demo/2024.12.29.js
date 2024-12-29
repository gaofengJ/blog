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

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((val) => {
        results[index] = val;
        completed += 1;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}

function myPromiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((val) => {
        results[index] = val;
      }).catch((reason) => {
        results[index] = reason;
      }).finally(() => {
        completed += 1;
        if (completed === promises.length) resolve(results);
      });
    });
  });
}

function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      const errors = [];
      let completed = 0;
      Promise.resolve(promise).then(resolve).reject((reason) => {
        errors[index] = reason;
        completed += 1;
        if (completed === promises.length) reject(errors);
      });
    });
  });
}

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}

Promise.prototype.finally = function (callback) {
  const constructor = this.constructor;
  return this.then(
    (value) => constructor.resolve(callback()).then(() => value),
    (reason) => constructor.resolve(callback()).then(() => { throw reason; }),
  );
};

function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = async (triesLeft) => {
      try {
        const result = await Promise.resolve(fn());
        resolve(result);
      } catch (error) {
        if (triesLeft <= 0) {
          reject(error);
        } else {
          setTimeout(() => attempt(triesLeft - 1), delay);
        }
      }
    };

    attempt(retries);
  });
}

function deepCloneDFS(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (map.has(obj)) return map.get(obj);

  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCloneDFS(obj[key], map);
    }
  }

  return copy;
}

Function.prototype.myCall = function (context, ...args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.myApply = function (context, args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    fn.apply(context, [...args, ...newArgs]);
  };
};

function myNew(fn, ...args) {
  const obj = Object.create(fn.prorotype);
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

const sleep = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

class LazyMan {
  constructor(name) {
    this.name = name;
    this.queue = [];
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
      console.log(food);
      this.next();
    });
  }

  sleep(time) {
    return this.addTask(() => {
      setTimeout(() => {
        console.log(time);
        this.next();
      }, time * 1000);
    });
  }

  sleepFirst(time) {
    return this.addTaskFirst(() => {
      setTimeout(() => {
        console.log(time);
        this.next();
      }, time * 1000);
    });
  }
}

function lazyMan(name) {
  return new LazyMan(name);
}

const add = (...args) => {
  let sum = args.reduce((accu, val) => accu + val, 0);

  const innerAdd = (...newArgs) => {
    sum += newArgs.reduce((accu, val) => accu + val, 0);
    return innerAdd;
  };

  innerAdd.toString = () => sum;
  innerAdd.valueOf = () => sum;

  return innerAdd;
};

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
      continue;
    }
    if (map.has(node.parentId)) map.get(node.parentId).children.push(node);
  }
  return ret;
};

const highlight = (str, keyword) => {
  const pattern = new RegExp(keyword, 'g');
  return str.replace(pattern, `<b style="color: red;">${keyword}</>`);
};

const findPathInTree = (tree, value) => {
  const path = [];
  const dfs = (nodes, target) => {
    for (let i = 0; i < nodes.length; i++) {
      path.push(nodes[i].id);
      if (nodes[i].id === target) return path;
      if (nodes.children) {
        const result = dfs(nodes.children, target);
        if (result.length) return result;
      }
      path.pop();
    }
    return [];
  };
  return dfs(tree, value);
};

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
    this.events.get(event).forEach((l) => {
      l.apply(this, args);
    });
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
    this.running = 0;
    this.limit = limit;
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
    if (this.running < this.limit && this.queue.length) {
      const task = this.queue.shift();
      task();
      this.running++;
    }
  }
}

const compareVersion = (version1, version2) => {
  const v1 = version1.split('.').map((i) => +i);
  const v2 = version2.split('.').map((i) => +i);

  const maxLen = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLen; i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;

    if (num1 < num2) return -1;
    if (num1 > num2) return 1;
  }

  return 0;
};

const sortVersions = (versions) => versions.sort(compareVersion);

const versions = ['0.0.1', '0.2.2', '1.0.0', '0.1.2'];
const sortedVersions = sortVersions(versions);

function get(obj, path, defaultValue) {
  const keys = Array.isArray(path) ? path : path.repalce(/\[(\d+)]/g, '.$1').split('.');

  let result = obj;

  for (const key of keys) {
    if (result === null || !(key in result)) {
      return defaultValue;
    }
    result = result[key];
  }

  return result === defaultValue ? defaultValue : result;
}

function isPromise(obj) {
  return obj instanceof Promise
  || (obj !== null && typeof obj === 'object' && typeof obj.then === 'function');
}

function bubbleSort(arr) {
  let n = arr.length;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;
      }
    }
    n--;
  }
  return arr;
}

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.lengt - 1];
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

const mergeNodes = (left, right) => {
  const ret = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      ret.push(left[i]);
      i++;
    } else {
      ret.push(right[j]);
      j++;
    }
  }

  return [...ret, ...left.slice(i), ...right.slice(j)];
};

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return mergeNodes(left, right);
}

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}
