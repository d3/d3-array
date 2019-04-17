import {slice} from "./array";
import bisect from "./bisect";
import constant from "./constant";
import extent from "./extent";
import range from "./range";
import {tickStep} from "./ticks";
import sturges from "./threshold/sturges";

export default function() {
  var valueX = identityX,
      valueY = identityY,
      domainX = extent,
      domainY = extent,
      thresholdX = sturges,
      thresholdY = sturges,
      minX, maxX, minY, maxY;
  function identityX (value){
    return value[0];
  }
  function identityY (value){
    return value[1];
  }
  function bin2d(data) {
    if (!Array.isArray(data)) data = Array.from(data);

    var i,
      n = data.length,
      binsById = {},
      bins=[],
      x,y,
      valuesX = new Array(n),
      valuesY = new Array(n);

    for (i = 0; i < n; ++i) {
      valuesX[i] = valueX(data[i], i, data);
      valuesY[i] = valueY(data[i], i, data);
    }

    var domX = domainX(valuesX),
        domY = domainY(valuesY);
    minX = domX[0],
    maxX = domX[1],
    minY = domY[0],
    maxY = domY[1];
    var tx = thresholdX(valuesX, minX, maxX),
        ty = thresholdY(valuesY, minY, maxY);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tx)) {
      tx = tickStep(minX, maxX, tx);
      tx = range(Math.ceil(minX / tx) * tx, maxX + tx, tx); // inclusive
    }

    if (!Array.isArray(ty)) {
      ty = tickStep(minY, maxY, ty);
      ty = range(Math.ceil(minY / ty) * ty, maxY + ty, ty); // inclusive
    }

    // Remove any thresholds outside the domain.

    var mx = tx.length;
    while (tx[0] <= minX) tx.shift(), --mx;
    while (tx[mx - 1] >= maxX) tx.pop(), --mx;

    var my = ty.length;
    while (ty[0] <= minY) ty.shift(), --my;
    while (ty[my - 1] >= maxY) ty.pop(), --my;


    var binsX = new Array(mx + 1), bin;

    // Initialize bins.
    for (i = 0; i <= mx; ++i) {
      bin = binsX[i] = [];
      bin.x0 = i > 0 ? tx[i - 1] : minX;
      bin.x1 = i < mx ? tx[i] : maxX;
    }

    var binsY = new Array(my + 1);

    // Initialize bins.
    for (i = 0; i <= my; ++i) {
      bin = binsY[i] = [];
      bin.y0 = i > 0 ? ty[i - 1] : minY;
      bin.y1 = i < my ? ty[i] : maxY;
    }


    var px,py;
    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = valuesX[i];
      y = valuesY[i];
      if (minX <= x && x <= maxX && minY <= y && y <= maxY) {
        px = bisect(tx, x, 0, mx);
        py = bisect(ty, y, 0, my);
        var id = px + "-" + py, bin = binsById[id];
        if (bin) bin.push(data[i]);
        else {
          bins.push(bin = binsById[id] = [data[i]]);
          bin.x0 = binsX[px].x0;
          bin.x1 = binsX[px].x1;
          bin.y0 = binsY[py].y0;
          bin.y1 = binsY[py].y1;
        }
      }
    }

    return bins;
  }

  bin2d.valueX = function(_) {
    return arguments.length ? (valueX = typeof _ === "function" ? _ : constant(_), bin2d) : valueX;
  };

  bin2d.valueY = function(_) {
    return arguments.length ? (valueY = typeof _ === "function" ? _ : constant(_), bin2d) : valueY;
  };

  bin2d.domainX = function(_) {
    return arguments.length ? (domainX = typeof _ === "function" ? _ : constant([_[0], _[1]]), bin2d) : domainX;
  };

  bin2d.domainY = function(_) {
    return arguments.length ? (domainY = typeof _ === "function" ? _ : constant([_[0], _[1]]), bin2d) : domainY;
  };

  bin2d.minX = function() { return minX; };

  bin2d.maxX = function() { return maxX; };

  bin2d.minY = function() { return minY; };

  bin2d.maxY = function() { return maxY; };

  bin2d.thresholdsX = function(_) {
    return arguments.length ? (thresholdX = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), bin2d) : thresholdX;
  };

  bin2d.thresholdsY = function(_) {
    return arguments.length ? (thresholdY = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), bin2d) : thresholdY;
  };

  return bin2d;
}
