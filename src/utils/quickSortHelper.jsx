export const quickSortAnimation = (arr) => {
  const animation = [];
  const auxArr = arr.slice();
  quickSort(arr, 0, arr.length - 1, animation);
  return animation;
};

const quickSort = (arr, low, high, animation) => {
  if (low >= high) {
    return;
  }

  const pivot_index = partition(arr, low, high, animation);
  quickSort(arr, low, pivot_index - 1, animation);
  quickSort(arr, pivot_index + 1, high, animation);
};

const partition = (arr, low, high, animation) => {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // animation.push(["pivot", high, , pivot, null, null]);
    if (arr[j].height < pivot.height) {
      i++;
      animation.push(["compare", i, arr[i], j, , arr[j], high]);
      animation.push(["swap", i, arr[i], j, arr[j], high]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  animation.push(["pivotSwap", i + 1, arr[i + 1], high, pivot, null]);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  return i + 1;
};
