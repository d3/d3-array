const tape = require("tape-await");
const d3 = require("../");

tape("zip() and zip([]) return an empty array", (test) => {
  test.deepEqual(d3.zip(), []);
  test.deepEqual(d3.zip([]), []);
});

tape("zip([a, b, …]) returns [[a], [b], …]", (test) => {
  test.deepEqual(d3.zip([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]]);
});

tape("zip([a1, b1, …], [a2, b2, …]) returns [[a1, a2], [b1, b2], …]", (test) => {
  test.deepEqual(d3.zip([1, 2], [3, 4]), [[1, 3], [2, 4]]);
  test.deepEqual(d3.zip([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]), [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
});

tape("zip([a1, b1, …], [a2, b2, …], [a3, b3, …]) returns [[a1, a2, a3], [b1, b2, b3], …]", (test) => {
  test.deepEqual(d3.zip([1, 2, 3], [4, 5, 6], [7, 8, 9]), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

tape("zip(…) ignores extra elements given an irregular matrix", (test) => {
  test.deepEqual(d3.zip([1, 2], [3, 4], [5, 6, 7]), [[1, 3, 5], [2, 4, 6]]);
});
