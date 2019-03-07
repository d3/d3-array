export default function(array, indexes) {
  var i = 0, permutes = array.slice();
  for (var p of indexes) {
    if (i === permutes.length) {
      var permutes2 = new permutes.constructor(2 * i + 1024);
      for (var j = 0; j < i; j++)
        permutes2[j] = permutes[j]
      permutes = permutes2;
    }
    permutes[i++] = array[p];
  }
  return permutes.slice(0,i);
}
