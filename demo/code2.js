function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, dealy) {
  let activeTime = 0;
  return function (...args) {
    const curTime = Date.now();
    if (curTime - activeTime > dealy) {
      fn.apply(this, args);
      activeTime = curTime;
    }
  };
}

function myPromseAll(promises) {
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
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}

Promise.prototype.myFinally = function (callback) {
  const constructor = this.constructor;
  return this.then(
    (value) => constructor.resolve(callback()).then(() => value),
    (reason) => constructor.resolve(callback()).then(() => { throw reason; }),
  );
};

function deepClone(obj, map = new Map()) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (map.has(obj)) return map.get(obj);

  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key], map);
    }
  }
  return copy;
}

function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function merge(left, right) {
  const ret = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] > right[j]) {
      ret.push(right[j]);
      j++;
    } else {
      ret.push(left[i]);
      i++;
    }
  }

  return [...ret, ...left.slice(i), ...right.slice(j)];
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function isPalindrome1(str) {
  const reversedStr = str.split('').reverse().join('');
  return reversedStr === str;
}

function isPalindrome2(str) {
  let left = 0;
  let right = str.length;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }

  return true;
}

function isPalindrome3(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome3(str.slice(1, -1));
}

Function.prototype.call = function (context, ...args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.apply = function (context, args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

Function.prototype.bind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};
