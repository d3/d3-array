export default function (f, i, array) {
  return f == null ? array[i] : f(array[i], i, array);
}
