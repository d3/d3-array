export default function(A, B) {
  if (!(A instanceof Set)) throw new Error("not a set");
  for (const a of A) if (!B.has(a)) return false;
  for (const b of B) if (!A.has(b)) return false;
  return true;
}
