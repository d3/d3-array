const tape = require("tape-await");
const d3 = require("../../");

tape("thresholdScott(values, min, max) returns the expected result", (test) => {
  test.equal(d3.thresholdScott([4, 3, 2, 1, NaN], 1, 4), 2);
});
