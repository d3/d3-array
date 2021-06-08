export default function(matrix) {
  // matrix is a key-value store of lines, themselves key-value stores of data.
  // dimension y of the incoming matrix
  const y = Object.keys(matrix);
  if (!y.length) return [];

  // dimension x of the incoming matrix
  const line0 = matrix[y[0]],
    x = new Set(Object.keys(line0)),
    transpose = line0.length ? [] : {};

  // prepare the transpose matrix with x as first dimension
  for (const k of x) {
    transpose[k] = matrix.length ? [] : {};
  }
  for (const [i, line] of Object.entries(matrix)) {
    for (const k of x) {
      // checks that each key is present in the line, otherwise:
      // - remove that key from the transpose (for lines already read)
      // - remove it from x (ignores it in future lines)
      if (!(k in line)) {
        delete transpose[k];
        x.delete(k);
      } else {
        transpose[k][i] = line[k];
      }
    }
  }
  return transpose;
}
