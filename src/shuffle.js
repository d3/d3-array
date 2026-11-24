export default shuffler(Math.random);

export function shuffler(random) {
  return function shuffle(array, i0 = 0, i1 = array.length) {
    i0 = Math.max(0, Math.floor(+i0));
    i1 = Math.max(i0, Math.min(array.length, Math.floor(+i1)));
    let m = i1 - i0;
    while (m) {
      const i = random() * m-- | 0, t = array[m + i0];
      array[m + i0] = array[i + i0];
      array[i + i0] = t;
    }
    return array;
  };
}
