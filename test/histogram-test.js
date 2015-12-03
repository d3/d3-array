var tape = require("tape"),
    arrays = require("../");

tape("histogram() returns a default histogram generator", function(test) {
  var h = arrays.histogram();
  test.equal(h.value()(42), 42);
  test.equal(h.range(), arrays.extent);
  test.deepEqual(h.thresholds()(0, 10, arrays.range(200)), arrays.range(1, 10));
  test.end();
});

tape("histogram(data) computes a histogram of the specified array of data", function(test) {
  var h = arrays.histogram();
  test.deepEqual(h([0, 0, 0, 10, 20, 20]), [
    bin([0, 0, 0], 0, 4),
    bin([], 4, 8),
    bin([10], 8, 12),
    bin([], 12, 16),
    bin([20, 20], 16, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("histogram.value(number) sets the constant value", function(test) {
  var h = arrays.histogram().value(12); // Pointless, but for consistency.
  test.deepEqual(h([0, 0, 0, 1, 2, 2]), [
    bin([0, 0, 0, 1, 2, 2], 12, 12),
  ]);
  test.end();
});

tape("histogram.value(function) sets the value accessor", function(test) {
  var h = arrays.histogram().value(function(d) { return d.value; }),
      a = {value: 0},
      b = {value: 10},
      c = {value: 20};
  test.deepEqual(h([a, a, a, b, c, c]), [
    bin([a, a, a], 0, 4),
    bin([], 4, 8),
    bin([b], 8, 12),
    bin([], 12, 16),
    bin([c, c], 16, 20)
  ]);
  test.end();
});

tape("histogram.range(array) sets the range", function(test) {
  var h = arrays.histogram().range([0, 20]);
  test.deepEqual(h.range()(), [0, 20]);
  test.deepEqual(h([1, 2, 2, 10, 18, 18]), [
    bin([1, 2, 2], 0, 4),
    bin([], 4, 8),
    bin([10], 8, 12),
    bin([], 12, 16),
    bin([18, 18], 16, 20)
  ]);
  test.end();
});

tape("histogram.range(function) sets the range accessor", function(test) {
  var values = [1, 2, 2, 10, 18, 18],
      actual,
      range = function(values) { actual = values; return [0, 20]; },
      h = arrays.histogram().range(range);
  test.equal(h.range(), range);
  test.deepEqual(h(values), [
    bin([1, 2, 2], 0, 4),
    bin([], 4, 8),
    bin([10], 8, 12),
    bin([], 12, 16),
    bin([18, 18], 16, 20)
  ]);
  test.deepEqual(actual, values);
  test.end();
});

tape("histogram.thresholds(number) sets the number of bin thresholds", function(test) {
  var h = arrays.histogram().thresholds(2);
  test.deepEqual(h([0, 0, 0, 10, 30, 30]), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([30, 30], 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("histogram.thresholds(array) sets the bin thresholds", function(test) {
  var h = arrays.histogram().thresholds([10, 20]);
  test.deepEqual(h([0, 0, 0, 10, 30, 30]), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([30, 30], 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("histogram.thresholds(function) sets the bin thresholds accessor", function(test) {
  var actual,
      values = [0, 0, 0, 10, 30, 30],
      h = arrays.histogram().thresholds(function(x0, x1, values) { actual = [x0, x1, values]; return [10, 20]; });
  test.deepEqual(h(values), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([30, 30], 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.deepEqual(actual, [0, 30, values]);
  test.end();
});

function bin(bin, x0, x1)  {
  bin.x0 = x0;
  bin.x1 = x1;
  return bin;
}
