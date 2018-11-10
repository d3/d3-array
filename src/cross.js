function* product(head, ...tail) {
  if (tail.length) {
    for (const h of head) {
      for (const t of product(...tail)) {
        yield [h, ...t];
      }
    }
  } else {
    for (const h of head) {
      yield [h];
    }
  }
}

function reducer(reduce) {
  return values => reduce(...values);
}

export default function cross(...values) {
  const reduce = typeof values[values.length - 1] === "function" ? reducer(values.pop()) : undefined;
  return Array.from(product(...values), reduce);
}
