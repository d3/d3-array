var tape = require("tape"),
    arrays = require("../");

tape("transpose([]) and transpose([[]]) return an empty array", function(test) {
  test.deepEqual(arrays.transpose([]), []);
  test.deepEqual(arrays.transpose([[]]), []);
  test.end();
});

tape("transpose([[a, b, …]]) returns [[a], [b], …]", function(test) {
  test.deepEqual(arrays.transpose([[1, 2, 3, 4, 5]]), [[1], [2], [3], [4], [5]]);
  test.end();
});

tape("transpose([[a1, b1, …], [a2, b2, …]]) returns [[a1, a2], [b1, b2], …]", function(test) {
  test.deepEqual(arrays.transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);
  test.deepEqual(arrays.transpose([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]]), [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
  test.end();
});

tape("transpose([[a1, b1, …], [a2, b2, …], [a3, b3, …]]) returns [[a1, a2, a3], [b1, b2, b3], …]", function(test) {
  test.deepEqual(arrays.transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
  test.end();
});

tape("transpose(…) ignores extra elements given an irregular matrix", function(test) {
  test.deepEqual(arrays.transpose([[1, 2], [3, 4], [5, 6, 7]]), [[1, 3, 5], [2, 4, 6]]);
  test.end();
});

tape("transpose(…) returns a copy", function(test) {
  var matrix = [[1, 2], [3, 4]],
      tranpose = arrays.transpose(matrix);
  matrix[0][0] = matrix[0][1] = matrix[1][0] = matrix[1][1] = 0;
  test.deepEqual(tranpose, [[1, 3], [2, 4]]);
  test.end();
});

tape("transpose([objects]) transposes an array of objects", function(test) {
  test.deepEqual(arrays.transpose([{a:1, b:2}, {a:3, b:4}, {a:5, b:6}]), {a: [1, 3, 5], b: [2, 4, 6]});
  test.end();
});

tape("transpose([objects]) only uses properties present in all the objects", function(test) {
  test.deepEqual(arrays.transpose([{a:1, b:2, c:-1}, {a:3, b:4}, {a:5, b:6, d:-1}]), {a: [1, 3, 5], b:[2, 4, 6]});
  test.end();
});

tape("transpose(object) transposes an object of arrays", function(test) {
  test.deepEqual(arrays.transpose({a: [1, 3, 5], b: [2, 4, 6]}), [{a:1, b:2}, {a:3, b:4}, {a:5, b:6}]);
  test.end();
});

tape("transpose(object) ignores extra elements", function(test) {
  test.deepEqual(arrays.transpose({a: [1, 3, 5], b: [2, 4, 6, 8]}), [{a:1, b:2}, {a:3, b:4}, {a:5, b:6}]);
  test.end();
});

tape("transpose(object) transposes an object of objects", function(test) {
  test.deepEqual(arrays.transpose({A: {a:1, b:2, c:-1}, B: {a:3, b:4}, C: {a:5, b:6, d:-1}}), { a: { A: 1, B: 3, C: 5 }, b: { A: 2, B: 4, C: 6 } });
  test.end();
});

