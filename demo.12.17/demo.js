function sort(arr) {
  let left = 0;
  let right = arr.length - 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      if (i === left) continue;
      const temp = arr[i];
      arr[i] = arr[left];
      arr[left] = temp;
      left++;
    } else if (arr[i] === 2) {
      if (i === right) continue;
      const temp = arr[i];
      arr[i] = arr[right];
      arr[right] = temp;
      right--;
    }
  }
  return arr;
}

console.log(sort([1, 0, 2, 1, 0, 1, 2, 1]));
