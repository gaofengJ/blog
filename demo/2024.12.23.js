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
    if (timer) clearInterval(timer);
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

function PromiseAllSettled(promises) {
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

function PromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return reject();
    const errors = [];
    let failCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(resolve).catch((reason) => {
        errors[index] = reason;
        failCount += 1;
        if (failCount === promises.length) reject(errors);
      });
    });
  });
}

function PromiseRace(promises) {
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

function deepCloneDFS(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (map.has(obj)) map.get(obj);

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
  const ret = context[fnSymbol](args);
  delete context[fnSymbol];
  return ret;
};

Function.prototype.myApply = function (context, args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const ret = context[fnSymbol](args);
  delete context[fnSymbol];
  return ret;
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

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(name);
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

function LazyMan(name) {
  return new LazyManClass(name);
}

const add = (...args) => {
  let sum = args.reduce((accu, val) => accu + val, 0);

  const innerAdd = (...innerArgs) => {
    sum += innerArgs.reduce((accu, val) => accu + val, 0);
    return innerAdd;
  };

  innerAdd.toString = () => sum;
  innerAdd.valueOf = () => sum;

  return innerAdd;
};

function convertListToTree(list) {
  const map = new Map();
  const ret = [];

  for (let i = 0; i < list.length; i++) {
    map.set(list[i], {
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
}

function findPathInTree(tree, value) {
  const path = [];

  const dfs = (nodes, target) => {
    for (let i = 0; i < nodes.length; i++) {
      path.push(nodes[i].id);
      if (nodes[i].id === target) return path;
      if (nodes[i].children) {
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
  once(event, listener) {
    const wrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, wrapper);
    };
    this.once(event, wrapper);
  }
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
    this.limit = limit;
    this.running = 0;
    this.queue = [];
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

  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
};

const sortVersions = (versions) => versions.sort(compareVersion);
const versions = ['0.0.1', '0.2.2', '1.0.0', '0.1.2'];
const sortedVersions = sortVersions(versions);

function get(obj, path, defaultValue) {
  const keys = Array.isArray(path) ? path : path.repalce();

  let result = obj;

  for (const key of keys) {
    if (result === null || !(key in result)) {
      return defaultValue;
    }
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}

function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = (triesLeft) => {
      try {
        const result = fn();
        if (result instanceof Promise) {
          result
            .then(resolve)
            .catch((error) => handleRetry(error, triesLeft));
        } else {
          resolve(result);
        }
      } catch (error) {
        handleRetry(error, triesLeft);
      }
    };

    const handleRetry = (error, triesLeft) => {
      if (triesLeft <= 0) {
        reject(error);
      } else {
        setTimeout(() => attempt(triesLeft - 1), delay);
      }
    };

    attempt(retries);
  });
}
