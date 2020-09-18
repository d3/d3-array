export default function (source, keys) {
  if (keys === undefined) {
    return permute(source);
  } else {
    return Array.from(keys, (key) => source[key]);
  }
}

// Based on https://github.com/google/guava/blob/f4b3f611c4e49ecaded58dcb49262f55e56a3322/guava/src/com/google/common/collect/Collections2.java#L622-L683
// Apache-2.0 License, Copyright (C) 2008 The Guava Authors.
export function* permute(source) {
  if (source.length <= 1) {
    yield source.slice();
  } else {
    source = source.slice();
    const c = Array(source.length).fill(0);
    const o = Array(source.length).fill(1);
    let j = Infinity;
    while (j > 0) {
      yield source.slice();
      j = source.length - 1;
      let s = 0;
      while (true) {
        const q = c[j] + o[j];
        if (q < 0) {
          o[j] = -o[j];
          j--;
        } else if (q === j + 1) {
          if (j === 0) {
            break;
          }
          s++;
          o[j] = -o[j];
          j--;
        } else {
          const a = j - c[j] + s;
          const b = j - q + s;
          [source[a], source[b]] = [source[b], source[a]];
          c[j] = q;
          break;
        }
      }
    }
  }
}
