export default function(arrays) {
  var queue = [arrays],
      array,
      result = [];

  while (array = queue.pop()) {
    if (Array.isArray(array)) {
      var n = array.length;
      while (--n >= 0) queue.push(array[n]);
    } else {
      result.push(array);
    }
  }

  return result;
};
