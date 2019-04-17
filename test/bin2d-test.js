var tape = require("tape"),
    arrays = require("../");

tape("bin2d() returns a default bin2d generator", function(test) {
  var h = arrays.bin2d();
  test.equal(h.valueX()([42,28]), 42);
  test.equal(h.valueY()([4,28]), 28);
  test.equal(h.domainX(), arrays.extent);
  test.equal(h.domainY(), arrays.extent);
  test.deepEqual(h.thresholdsX(), arrays.thresholdSturges);
  test.deepEqual(h.thresholdsY(), arrays.thresholdSturges);
  test.end();
});

tape("bin2d(data) computes a bin2d of the specified array of data", function(test) {
  var h = arrays.bin2d();
  test.deepEqual(h([[0,0],[1,1], [2,2], [10,10], [20, 20]]), [
    bin([[0,0],[1,1], [2,2]], 0, 5, 0, 5),
    bin([[10,10]], 10, 15, 10, 15),
    bin([[20,20]], 15, 20, 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d(iterable) is equivalent to bin2d(array)", function(test) {
  var h = arrays.bin2d();
  test.deepEqual(h(iterable([[0,0],[1,1], [2,2], [10,10], [20, 20]])), [
    bin([[0,0],[1,1], [2,2]], 0, 5, 0, 5),
    bin([[10,10]], 10, 15, 10, 15),
    bin([[20,20]], 15, 20, 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.value(number) sets the constant value", function(test) {
  var h = arrays.bin2d().valueX(12).valueY(11); // Pointless, but for consistency.
  test.deepEqual(h([[0, 0],[27,1], [0, 1], [2, 2]]), [
    bin([[0, 0],[27,1], [0, 1], [2, 2]], 12, 12, 11, 11),
  ]);
  test.end();
});

tape("bin2d.value(function) sets the value accessor", function(test) {
  var h = arrays.bin2d().valueX(function(d) { return d.valueX; }).valueY(function(d) { return d.valueY; }),
      a = {valueX: 0, valueY: 0},
      b = {valueX: 10, valueY: 12},
      c = {valueX: 20, valueY: 200};
  test.deepEqual(h([a, a, a, b, c, c]), [
    bin([a, a, a], 0, 5, 0, 50),
    bin([b], 10, 15, 0, 50),
    bin([c, c], 15, 20, 150, 200)
  ]);
  test.end();
});

tape("bin2d.domainX(array) sets the X domain", function(test) {
  var h = arrays.bin2d().domainX([0, 20]);
  test.deepEqual(h.domainX()(), [0, 20]);
  test.deepEqual(h([[0,0],[1,1], [2,2], [10,10], [20, 20]]), [
    bin([[0,0],[1,1], [2,2]], 0, 5, 0, 5),
    bin([[10,10]], 10, 15, 10, 15),
    bin([[20,20]], 15, 20, 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.domainY(array) sets the Y domain", function(test) {
  var h = arrays.bin2d().domainY([0, 20]);
  test.deepEqual(h.domainY()(), [0, 20]);
  test.deepEqual(h([[0,0],[1,1], [2,2], [10,10], [20, 20]]), [
    bin([[0,0],[1,1], [2,2]], 0, 5, 0, 5),
    bin([[10,10]], 10, 15, 10, 15),
    bin([[20,20]], 15, 20, 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.domainX(function) sets the X domain accessor", function(test) {
  var values = [[0,1],[1,2], [2,2], [10,10], [20, 20]],
      actual,
      domain = function(values) { actual = values; return [0, 20]; },
      h = arrays.bin2d().domainX(domain);
  test.equal(h.domainX(), domain);
  test.deepEqual(h(values),  [
    bin([[0,1],[1,2], [2,2]], 0, 5, 1, 5),
    bin([[10,10]], 10, 15, 10, 15),
    bin([[20,20]], 15, 20, 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.deepEqual(actual, values.map(function(oneVal){return oneVal[0];}));
  test.end();
});

tape("bin2d.domainY(function) sets the Y domain accessor", function(test) {
  var values = [[0,1],[1,2], [2,2], [10,10], [20, 20]],
    actual,
    domain = function(values) { actual = values; return [0, 20]; },
    h = arrays.bin2d().domainY(domain);
  test.equal(h.domainY(), domain);
  test.deepEqual(h(values),  [
    bin([[0,1],[1,2], [2,2]], 0, 5, 0, 5),
    bin([[10,10]], 10, 15, 10, 15),
    bin([[20,20]], 15, 20, 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.deepEqual(actual, values.map(function(oneVal){return oneVal[1];}));
  test.end();
});
tape("bin2d.thresholdsX(number) sets the approximate number of bins for x", function(test) {
  var h = arrays.bin2d().thresholdsX(8);
  test.deepEqual(h([[0,1],[1,2], [2,2], [10,10], [20, 20]]), [
    bin([[0,1],[1,2]], 0, 2, 1, 5),
    bin([[2,2]], 2, 4, 1, 5),
    bin([[10,10]], 10, 12, 10, 15),
    bin([[20, 20]], 18, 20, 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.thresholdsY(number) sets the approximate number of bins for y", function(test) {
  var h = arrays.bin2d().thresholdsY(8);
  test.deepEqual(h([[0,1],[1,2], [2,2], [10,10], [20, 20]]), [
    bin([[0,1]], 0, 5, 1, 2),
    bin([[1,2],[2,2]], 0, 5, 2, 4),
    bin([[10,10]], 10, 15, 10, 12),
    bin([[20, 20]], 15, 20, 18, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.thresholdsX(array) sets the bin thresholds for x", function(test) {
  var h = arrays.bin2d().thresholdsX([10, 20]);
  test.deepEqual(h([[0,1],[1,2], [2,2], [10,10], [30, 30]]), [
    bin([[0,1],[1,2],[2,2]], 0, 10, 1, 10),
    bin([[10,10]], 10, 20, 10, 20),
    bin([[30, 30]], 20, 30, 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.thresholdsY(array) sets the bin thresholds for y", function(test) {
  var h = arrays.bin2d().thresholdsY([9, 18]);
  test.deepEqual(h([[0,1],[1,2], [2,2], [10,10], [30, 30]]), [
    bin([[0,1],[1,2],[2,2]], 0, 10, 1, 9),
    bin([[10,10]], 10, 20, 9, 18),
    bin([[30, 30]], 20, 30, 18, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.thresholdsX(array) ignores x thresholds outside the domain", function(test) {
  var h = arrays.bin2d().thresholdsX([0, 10, 20, 30]);
  test.deepEqual(h([[0,1],[1,2], [2,2], [10,10], [30, 30]]), [
    bin([[0,1],[1,2],[2,2]], 0, 10, 1, 10),
    bin([[10,10]], 10, 20, 10, 20),
    bin([[30, 30]], 20, 30, 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.thresholdsY(array) ignores y thresholds outside the domain", function(test) {
  var h = arrays.bin2d().thresholdsY([-10, 10, 20, 50]);
  test.deepEqual(h([[0,1],[1,2], [2,2], [10,10], [30, 30]]), [
    bin([[0,1],[1,2],[2,2]], 0, 10, 1, 10),
    bin([[10,10]], 10, 20, 10, 20),
    bin([[30, 30]], 20, 30, 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.thresholdsX(function) sets the bin x thresholds accessor", function(test) {
  var actual,
      values = [[0,1],[1,2], [2,2], [10,10], [30, 30]],
      h = arrays.bin2d().thresholdsX(function(values, x0, x1) { actual = [values, x0, x1]; return [10, 15]; });
  test.deepEqual(h(values), [
    bin([[0,1],[1,2],[2,2]], 0, 10, 1, 10),
    bin([[10,10]], 10, 15, 10, 20),
    bin([[30, 30]], 15, 30, 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.deepEqual(actual, [values.map(function(v){return h.valueX()(v);}), 0, 30]);
  test.deepEqual(h.thresholdsX(function() { return [5]; })(values), [
    bin([[0,1],[1,2],[2,2]], 0, 5, 1, 10),
    bin([[10,10]], 5, 30, 10, 20),
    bin([[30, 30]], 5, 30, 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d.thresholdsY(function) sets the bin y thresholds accessor", function(test) {
  var actual,
      values = [[0,1],[1,2], [2,2], [10,10], [30, 30]],
      h = arrays.bin2d().thresholdsY(function(values, x0, x1) { actual = [values, x0, x1]; return [2, 15]; });
  test.deepEqual(h(values), [
    bin([[0,1],], 0, 10, 1, 2),
    bin([[1,2],[2,2]], 0, 10, 2, 15),
    bin([[10,10]], 10, 20, 2, 15),
    bin([[30, 30]], 20, 30, 15, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.deepEqual(actual, [values.map(function(v){return h.valueY()(v);}), 1, 30]);
  test.deepEqual(h.thresholdsY(function() { return [5]; })(values), [
    bin([[0,1],[1,2],[2,2]], 0, 10, 1, 5),
    bin([[10,10]], 10, 20, 5, 30),
    bin([[30, 30]], 20, 30, 5, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin2d()() returns bins whose rightmost bin is not too wide", function(test) {
  var h = arrays.bin2d();
  test.deepEqual(h([[-0.2,1],[1,2], [2,2], [10,10], [10, 10.8]]), [
    bin([[-0.2,1]], -0.2, 0, 1, 2),
    bin([[1,2]], 0, 2, 2, 4),
    bin([[2,2]], 2, 4, 2, 4),
    bin([[10,10],[10, 10.8]], 8, 10, 10, 10.8) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});


function bin(bin, x0, x1, y0, y1)  {
  bin.x0 = x0;
  bin.x1 = x1;
  bin.y0 = y0;
  bin.y1 = y1;
  return bin;
}

function* iterable(array) {
  yield* array;
}
