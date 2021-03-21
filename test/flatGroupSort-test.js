const tape = require("tape-await");
const d3 = require("../");
const barley = require("./data/barley.json");

const sortedKeys = [ [ 'No. 475', 'Grand Rapids' ], [ 'Glabron', 'Grand Rapids' ], [ 'No. 462', 'Grand Rapids' ], [ 'Svansota', 'Grand Rapids' ], [ 'Svansota', 'Duluth' ], [ 'Velvet', 'Duluth' ], [ 'Trebi', 'Grand Rapids' ], [ 'No. 462', 'Duluth' ], [ 'Manchuria', 'Duluth' ], [ 'No. 457', 'Grand Rapids' ], [ 'Manchuria', 'University Farm' ], [ 'No. 475', 'University Farm' ], [ 'Manchuria', 'Grand Rapids' ], [ 'Wisconsin No. 38', 'Grand Rapids' ], [ 'Velvet', 'Grand Rapids' ], [ 'Glabron', 'Duluth' ], [ 'No. 457', 'Duluth' ], [ 'No. 475', 'Duluth' ], [ 'Svansota', 'Morris' ], [ 'Peatland', 'University Farm' ], [ 'Wisconsin No. 38', 'Duluth' ], [ 'Svansota', 'Crookston' ], [ 'Peatland', 'Grand Rapids' ], [ 'Manchuria', 'Morris' ], [ 'No. 462', 'University Farm' ], [ 'Svansota', 'University Farm' ], [ 'Peatland', 'Duluth' ], [ 'Glabron', 'Morris' ], [ 'Glabron', 'Crookston' ], [ 'Trebi', 'Duluth' ], [ 'Velvet', 'Morris' ], [ 'Trebi', 'University Farm' ], [ 'Velvet', 'University Farm' ], [ 'No. 475', 'Morris' ], [ 'Peatland', 'Crookston' ], [ 'No. 457', 'University Farm' ], [ 'No. 457', 'Morris' ], [ 'Manchuria', 'Crookston' ], [ 'Peatland', 'Morris' ], [ 'Velvet', 'Crookston' ], [ 'No. 475', 'Crookston' ], [ 'Wisconsin No. 38', 'Morris' ], [ 'Wisconsin No. 38', 'University Farm' ], [ 'No. 462', 'Morris' ], [ 'No. 462', 'Crookston' ], [ 'Glabron', 'University Farm' ], [ 'No. 457', 'Crookston' ], [ 'Manchuria', 'Waseca' ], [ 'Peatland', 'Waseca' ], [ 'Wisconsin No. 38', 'Crookston' ], [ 'Svansota', 'Waseca' ], [ 'Velvet', 'Waseca' ], [ 'No. 475', 'Waseca' ], [ 'Trebi', 'Crookston' ], [ 'Trebi', 'Morris' ], [ 'Glabron', 'Waseca' ], [ 'No. 457', 'Waseca' ], [ 'No. 462', 'Waseca' ], [ 'Trebi', 'Waseca' ], [ 'Wisconsin No. 38', 'Waseca' ] ];

tape("flatGroupSort(data, reduce, ...keys) returns sorted keys when reduce is an accessor", (test) => {
  test.deepEquals(d3.flatGroupSort(barley, g => d3.median(g, d => d.yield), d => d.variety, d => d.site), sortedKeys);
});

tape("flatGroupSort(data, reduce, ...keys) returns sorted keys when reduce is a comparator", (test) => {
  test.deepEquals(
    d3.flatGroupSort(barley, (a, b) => d3.ascending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.variety, d => d.site),
    sortedKeys
  );
});
