---
title: 算法题
description: 算法题
---

# 算法题

## 排序

### 冒泡

```js
// 冒泡排序，时间复杂度(log(n^2))
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 改良版
function bubbleSort(arr) {
  let n = arr.length;
  let swapped = true; // 当前遍历是否发生了交换

  while (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    n--; // 减少比较的范围
  }

  return arr;
}
```

### 快速排序

```js
function quickSort(arr) {
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

  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

快速排序的时间复杂度取决于基准选择的情况：

* **最佳情况**

  每次基准将数组均匀分割，递归深度为 O(log n)，每一层的比较操作是 O(n)，所以整体时间复杂度为 O(n log n)。

* **平均情况**

  通常假设基准每次都能将数组分为两个大致相等的部分，因此时间复杂度为 O(n log n)。

* **最坏情况**

  当基准选取不均衡时，可能导致递归的深度达到 O(n)，比如每次选取的基准总是最大或最小的元素。此时时间复杂度为 O(n²)。

### 归并排序 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
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

  return [...ret, ...left.slice(i), ...right.slice(j)];
}

// 归并排序，时间复杂度(O(nlogn))
function mergeSort(arr) {
  // 如果数组长度小于等于 1，则无需排序
  if (arr.length <= 1) return arr;
  // 找到中间位置
  const mid = Math.floor(arr.length / 2);
  // 分割数组，递归调用
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // 合并两个有序数组
  return merge(left, right);
}
```

## 轮转数组

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

```js
const reverse = (nums, left, right) => {
  while (left < right) {
    const temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
    left++;
    right--;
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  const len = nums.length;
  k = k % len;
  reverse(nums, 0, len - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, len - 1);
  return nums;
};
```

## 移动0

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

> [!TIP]
>
> 输入: [0,1,0,3,12]<br />
> 输出: [1,3,12,0,0]<br />
> 说明:<br />
> 必须在原数组上操作，不能拷贝额外的数组。<br />
> 尽量减少操作次数。

```js
const moveZeroes = (nums) => {
  let index = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[index] = nums[i];
      index++;
    }
  }

  for (let i = index; i < nums.length; i++) {
      nums[i] = 0;
  }

  return nums;
}
```

## 两数之和

```js
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
};
```

## 给定两个数组，写一个方法来计算它们的交集

```js
const intersect = (nums1, nums2) => {
  const obj = {};
  for (let i = 0; i < nums1.length; i++) {
    obj[nums1[i]] = (obj[nums1[i]] || 0) + 1;
  }
  const ret = [];
  for (let i = 0; i < nums2.length; i++) {
    if (obj[nums2[i]]) {
      ret.push(nums2[i]);
      obj[nums2[i]]--;
    }
  }
  return ret;
}

const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];
console.log(intersect(nums1, nums2)); // 输出: [2, 2]
```

## 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))

> [!TIP]
>
> nums1 = [1, 3]
> nums2 = [2]
> 输出 2

```js
const findMedianSortedArrays = (nums1, nums2) => {
  const arr = [...nums1, ...nums2];
  const sortedArr = arr.sort((a, b) => a - b);
  const midIndex = Math.floor(sortedArr.length / 2);
  if (sortedArr.length % 2) {
    return sortedArr[midIndex];
  }
  return (sortedArr[midIndex - 1] + sortedArr[midIndex]) / 2;
};

findMedianSortedArrays([1,3], [2]); // 2
```

## 判断回文字符串，三种方式 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

* **字符串反转法(时间复杂度：O(n))**

```js
function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("javascript")); // false
```

* **双指针(时间复杂度：O(n))**

```js
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome("abba")); // true
console.log(isPalindrome("hello")); // false

```

* **递归(时间复杂度：O(n))**

```js
function isPalindrome(str) {
  if (str.length <= 1) {
    return true;
  }

  if (str[0] !== str[str.length - 1]) {
    return false;
  }

  return isPalindrome(str.slice(1, -1));
}

console.log(isPalindrome("level")); // true
console.log(isPalindrome("coding")); // false

```
