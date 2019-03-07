export default function(array, indexes) {
  var i = 0, permutes = array.slice();
  for (var p of indexes) permutes[i++] = array[p];
  return permutes.slice(0,i);
}
