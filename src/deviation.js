import variance from "./variance";

export default function() {
  var v = variance.apply(this, arguments);
  return v ? Math.sqrt(v) : v;
};
