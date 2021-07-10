export default function(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b))
    || (b < a ? -1 : b > a ? 1 : 0);
}
