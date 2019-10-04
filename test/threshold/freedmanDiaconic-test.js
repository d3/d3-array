var tape = require("tape"),
    arrays = require("../../");

tape("thresholdFreedmanDiaconis(values, min, max) returns the expected result", function(test) {
  test.equal(arrays.thresholdFreedmanDiaconis([4, 3, 2, 1, NaN], 1, 4), 2);
  test.end();
});
