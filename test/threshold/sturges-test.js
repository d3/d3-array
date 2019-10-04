var tape = require("tape"),
    arrays = require("../../");

tape("thresholdSturges(values, min, max) returns the expected result", function(test) {
  test.equal(arrays.thresholdSturges([4, 3, 2, 1, NaN], 1, 4), 3);
  test.end();
});
