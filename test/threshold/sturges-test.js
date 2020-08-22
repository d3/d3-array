const tape = require("tape-await");
const d3 = require("../../");

tape("thresholdSturges(values, min, max) returns the expected result", (test) => {
  test.equal(d3.thresholdSturges([4, 3, 2, 1, NaN], 1, 4), 3);
});
