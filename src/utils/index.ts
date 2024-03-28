const isDev = process.env.NODE_ENV === 'development';

const getThemeBg = (theme = true) => {
    return theme ? {
        backgroundColor: 'rgba(73, 82, 123, 0.3)',
        color: 'rgba(255, 255, 255, 1)' 
    } : {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: 'rgba(0, 0, 0, 1)' 
    }
}

// 冒泡排序
function* bubbleSort(arr: number[]) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j <= n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        yield arr.map((a, i) => ({
          value: a,
          swap: i === j || i === j + 1,
        }));
      }
    }
    return arr;
  }

// 选择排序
function* selectionSort(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      let lowest = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[lowest]) lowest = j;
      }
      if (lowest !== i) {
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
      }
      yield arr.map((a, index) => ({
        value: a,
        swap: index === lowest || index === i,
      }));
    }
    return arr;
  }

  function* insertionSort(arr: number[]) {
    const len = arr.length;
    let preIndex:number, current;
    for (let i = 1; i < len; i++) {
      preIndex = i - 1;
      current = arr[i];
      while (preIndex >= 0 && arr[preIndex] > current) {
        arr[preIndex + 1] = arr[preIndex];
        preIndex--;
      }
      arr[preIndex + 1] = current;
      yield arr.map((a, index) => ({
        value: a,
        swap: index === preIndex + 1 || index === i,
      }));
    }
    return arr;
  }

  const sleep = (time = 2000) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, time)
  })

export {
    getThemeBg,
    bubbleSort,
    selectionSort,
    insertionSort,
    sleep,
    isDev
}