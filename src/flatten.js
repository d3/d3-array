export default function(array) {
  var queue = [],
      result = [];

  do {
    if (Array.isArray(array)) {
      var n = array.length;
      while (--n >= 0) queue.push(array[n]);
    } else {
      result.push(array);
    }
  } while (array = queue.pop());

  return result;
};
