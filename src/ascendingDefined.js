export default function(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b))
    || (a < b ? -1 : a > b ? 1 : 0);
}
