let arr = [1, 2, 3, 4];
function wrap (arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

/*
* 建堆的过程从最底层开始,这样为上层建堆时,下层已经将最大的数推至最上,只需要确认一下交换的
* 子节点树是否需要重新建立,如果需要的话递归重新建立一下子节点树即可.
*/
function heapify (arr, i, len) {
  let left = 2 * i + 1; //元素的左节点
  let right = 2 * i + 2; // 元素的右节点
  let largest = i;
  if (left < len && arr[left] > arr[largest]) { largest = left; }
  if (right < len && arr[right] > arr[largest]) { largest = right; }
  if (largest !== i) {
  	wrap(arr, largest, i);
    heapify(arr, largest, len); // 递归判断子子数是否满足堆的规则.
  }
}

function sort (arr) {
  if (arr.length < 2) { return arr; }
  let len = arr.length, end = Math.pow(2, Math.ceil(Math.log2(len + 1)) - 1) - 1;
  for (let i = end - 1; i >= 0; i--) {
    heapify(arr, i, len);
  }
  for (let i = len - 1; i >= 0; i--) {
    wrap(arr, 0, i);
    len--;
    heapify(arr, 0, len);
  }
  return arr;
}

console.log(sort(arr));