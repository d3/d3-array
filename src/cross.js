function* product(head, ...rest) {
  if (rest.length) {
    const tail = rest.pop();
    for (const p of product(head, ...rest)) {
      for (const t of tail) {
        yield [...p, t];
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
