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
      Promise.resolve(promise).then((value) => {
        results[index] = value;
        completed += 1;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
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

Promise.finally = (callback) => {
  const constructor = this.constructor;
  return this.then(
    (value) => constructor.resolve(callback()).then(() => value),
    (reason) => constructor.resolve(callback()).then(() => { throw reason; }),
  );
};

function deepCloneDFS(obj, map = new Map()) {
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
  const ret = context[fnSymbol](...args);
  delete context[fnSymbol];
  return ret;
};

Function.prototype.myApply = function (context, args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const ret = context[fnSymbol](...args);
  delete context[fnSymbol];
  return ret;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}

const flatten = (arr, ret = []) => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatten([...arr[i]], ret);
    } else {
      ret.push(arr[i]);
    }
  }
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

class LazyManClass {
  consturctor(name) {
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

function LazyMan(name) {
  return new LazyManClass(name);
}

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
    if (map.has(node.parentId)) {
      map.get(node.parentId).children.push(node);
    }
  }
  return ret;
};

const highlight = (str, keyword) => {
  const pattern = new RegExp(keyword, 'g');
  return str.replace(pattern, `<b>${keyword}</b>`);
};

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
    this.events.set(event, this.events.filter((l) => l !== listener));
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach((l) => {
      l.apply(this, args);
    });
  }

  once(event, listener) {
    const wrap = (...args) => {
      listener.apply(this, args);
      this.off(event, wrap);
    };
    this.on(event, wrap);
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

Array.prototype.myReduce = (callback, initail) => {
  let accu = initail;

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
    if (this.running < this.limit && this.queue.length) {
      const task = this.queue.shift();
      task();
      this.running++;
    }
  }
}

const compareVersions = (version1, version2) => {
  const v1 = version1.split('').map((i) => +i);
  const v2 = version2.split('').map((i) => +i);

  const maxLen = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLen; i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return 2;
  }

  return 0;
};

const sortVersions = (versions) => versions.sort(compareVersions);

const versions = ['0.0.1', '0.2.2', '1.0.0', '0.1.2'];

function isPromise(obj) {
  return (obj instanceof Promise || obj !== null && typeof obj === 'object' && typeof obj.then === 'function');
}

function bubbleSort(arr) {
  let swapped = true;
  let n = arr.length;

  while (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
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
  while (l < left.length || r < right.length) {
    if (left[l] < right[r]) {
      ret.push(left[l]);
      l++;
    } else {
      ret.push(right[r]);
      r++;
    }
  }
  return [...ret, ...left.slice(l), ...right.slice(r)];
};

function mergeSort(arr) {
  if (!arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

const isPalindrome = (str) => {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
};
