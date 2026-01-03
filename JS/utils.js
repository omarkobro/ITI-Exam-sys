function shuffleArray(arr) {
  var currentIdx = arr.length;
  var tempValue;
  var randomIdx;

  while (currentIdx != 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);

    currentIdx--;

    tempValue = arr[currentIdx];
    arr[currentIdx] = arr[randomIdx];
    arr[randomIdx] = tempValue;
  }

  return arr;
}

