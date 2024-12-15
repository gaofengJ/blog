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
    const now = Date.now();
    if (now - activeTime > delay) {
      fn.apply(this, args);
      activeTime = now;
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
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
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
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.myApply = function (context, args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
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
  return ret;
};

flatten([1, [2, 3], [4, 5, [6, 7, 8]]]);

const sleep = (time) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
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

  addFirstTask(task) {
    this.queue.unshift(task);
    return this;
  }

  next() {
    if (this.queue.length > 0) {
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
    return this.addFirstTask(() => {
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

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5)
  .sleep(10)
  .eat('junk food');

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
      map.get(node.parentId).children.push(node);
    }
  }

  return ret;
};

const list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 },
];
const result = convertListToTree(list);

const highlight = (str, keyword) => {
  const pattern = new RegExp(keyword, 'g');
  return str.replace(pattern, `<b style="color: #FF0000;">${keyword}</b>`);
};

const findPathInTree = (tree, value) => {
  const path = [];
  const dfs = (nodes, target) => {
    for (let i = 0; i < nodes.length; i++) {
      path.push(nodes[i].id);
      if (nodes[i].id === target) return path;
      if (nodes[i].children.length) {
        const result = dfs(nodes[i].children, target);
        if (result.length > 1) return result;
      }
      path.pop(nodes[i].id);
    }
    return [];
  };

  return dfs(tree, value);
};

class EventBus {
  consturctor() {
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

function myInstanceOf(obj, constructor) {
  let prototype = Object.getPrototypeOf(obj);
  while (prototype) {
    if (prototype === constructor.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}

Array.prototype.myReduce = (callback, initial) => {
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
    if (this.limit > this.running && this.queue.length) {
      const task = this.queue.shift();
      task();
      this.running++;
    }
  }
}

const compareVersions = (version1, version2) => {
  const v1 = version1.split('.').map((i) => +i);
  const v2 = version2.split('.').map((i) => +i);

  const maxLen = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLen; i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
};

const sortVersions = (versions) => versions.sort(compareVersions);

const versions = ['0.0.1', '0.2.2', '1.0.0', '0.1.2'];
const sortedVersions = sortVersions(versions);

function isPromise(obj) {
  return (
    obj instanceof Promise
    || (obj !== null && typeof obj === 'object' && typeof obj.then === 'function')
  );
}

function bubbleSort(arr) {
  let n = arr.length;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
    n--;
  }
  return arr;
}

function quickSrot(arr) {
  if (arr.length <= 1) return arr;

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

  return [...quickSrot(left), pivot, ...quickSrot(right)];
}

function merge(left, right) {
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

  return [...ret, ...left.slice(i), ...right(j)];
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.lengt - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}
