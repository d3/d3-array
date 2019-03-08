export default function(array, indexes) {
  var i = 0, permutes = array.slice(), l = permutes.length;
  for (var p of indexes) {
    if (i === l) {
      var permutes2 = new permutes.constructor(l = indexes.length || 2 * i + 1024);
      for (var j = 0; j < i; j++)
        permutes2[j] = permutes[j]
      permutes = permutes2;
    }
    permutes[i++] = array[p];
  }
  return permutes.slice(0,i);
}
