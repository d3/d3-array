import bisect from "./bisect";
import constant from "./constant";
import extent from "./extent";
import identity from "./identity";

function number(x) {
  return +x;
}

function thresholdSturges(x0, x1, values) {
  return thresholdUniform(x0, x1, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
}

function thresholdUniform(x0, x1, n) {
  var i = -1,
      dx = (x1 - x0) / (n + 1),
      thresholds = new Array(n);

  x0 += dx;
  while (++i < n) {
    thresholds[i] = dx * i + x0;
  }

  return thresholds;
}

export default function() {
  var value = identity,
      range = extent,
      threshold = thresholdSturges;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    // Coerce values to numbers.
    for (i = 0; i < n; ++i) {
      values[i] = +value(data[i], i, data);
    }

    var xz = range(values),
        x0 = +xz[0],
        x1 = +xz[1],
        tz = threshold(x0, x1, values),
        m = tz.length;

    // Coerce thresholds to numbers, ignoring any outside the range.
    for (i = 0; i < m; ++i) x = tz[i] = +tz[i];
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] >= x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the range.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[bisect(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), histogram) : value;
  };

  histogram.range = function(_) {
    return arguments.length ? (range = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), histogram) : range;
  };

  histogram.thresholds = function(_) {
    if (!arguments.length) return threshold;
    threshold = typeof _ === "function" ? _
        : Array.isArray(_) ? constant(Array.prototype.map.call(_, number))
        : (_ = +_, function(x0, x1) { return thresholdUniform(x0, x1, _); });
    return histogram;
  };

  return histogram;
};
