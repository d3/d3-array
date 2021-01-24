const tape = require("tape-await");
const d3 = require("../");
const barley = require("./data/barley.json");

tape("groupSort(data, reduce, key) returns sorted keys when reduce is an accessor", (test) => {
  test.deepEquals(
    d3.groupSort(barley, g => d3.median(g, d => d.yield), d => d.variety),
    ["Svansota", "No. 462", "Manchuria", "No. 475", "Velvet", "Peatland", "Glabron", "No. 457", "Wisconsin No. 38", "Trebi"]
  );
  test.deepEquals(
    d3.groupSort(barley, g => -d3.median(g, d => d.yield), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  test.deepEquals(
    d3.groupSort(barley, g => d3.median(g, d => -d.yield), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  test.deepEquals(
    d3.groupSort(barley, g => d3.median(g, d => d.yield), d => d.site),
    ["Grand Rapids", "Duluth", "University Farm", "Morris", "Crookston", "Waseca"]
  );
  test.deepEquals(
    d3.groupSort(barley, g => -d3.median(g, d => d.yield), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
  test.deepEquals(
    d3.groupSort(barley, g => d3.median(g, d => -d.yield), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
});

tape("groupSort(data, reduce, key) returns sorted keys when reduce is a comparator", (test) => {
  test.deepEquals(
    d3.groupSort(barley, (a, b) => d3.ascending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.variety),
    ["Svansota", "No. 462", "Manchuria", "No. 475", "Velvet", "Peatland", "Glabron", "No. 457", "Wisconsin No. 38", "Trebi"]
  );
  test.deepEquals(
    d3.groupSort(barley, (a, b) => d3.descending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  test.deepEquals(
    d3.groupSort(barley, (a, b) => d3.ascending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.site),
    ["Grand Rapids", "Duluth", "University Farm", "Morris", "Crookston", "Waseca"]
  );
  test.deepEquals(
    d3.groupSort(barley, (a, b) => d3.descending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
});

tape("medianSort(data, value, key) returns sorted keys", (test) => {
  test.deepEquals(
    d3.medianSort(barley, d => d.yield, d => d.variety),
    ["Svansota", "No. 462", "Manchuria", "No. 475", "Velvet", "Peatland", "Glabron", "No. 457", "Wisconsin No. 38", "Trebi"]
  );
  test.deepEquals(
    d3.medianSort(barley, d => -d.yield, d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  test.deepEquals(
    d3.medianSort(barley, d => d.yield, d => d.site),
    ["Grand Rapids", "Duluth", "University Farm", "Morris", "Crookston", "Waseca"]
  );
  test.deepEquals(
    d3.medianSort(barley, d => -d.yield, d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
});
