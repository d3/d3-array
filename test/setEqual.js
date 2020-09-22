const tape = require("tape-await");

tape.Test.prototype.setEqual = function(actual, expected) {
  this._assert(setEqual(actual, expected), {
    message: "should be equal",
    operator: "setEqual",
    actual,
    expected
  });
};

function setEqual(A, B) {
  if (!(A instanceof Set)) throw new Error("not a set");
  for (const a of A) if (!B.has(a)) return false;
  for (const b of B) if (!A.has(b)) return false;
  return true;
}
