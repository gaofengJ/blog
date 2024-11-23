---
title: 算法题
description: 算法题
---

# 算法题

## 冒泡排序如何实现，时间复杂度是多少， 还可以如何改进

冒泡排序的时间复杂度为 log(n^2)

```js
// 冒泡排序
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
  console.log(arr);
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

  console.log(arr);
}
```

## 快速排序如何实现，时间复杂度是多少， 还可以如何改进

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

* 最佳情况：每次基准将数组均匀分割，递归深度为 O(log n)，每一层的比较操作是 O(n)，所以整体时间复杂度为 O(n log n)。

* 平均情况：通常假设基准每次都能将数组分为两个大致相等的部分，因此时间复杂度为 O(n log n)。

* 最坏情况：当基准选取不均衡时，可能导致递归的深度达到 O(n)，比如每次选取的基准总是最大或最小的元素。此时时间复杂度为 O(n²)。

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