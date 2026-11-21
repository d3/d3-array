export default function primitive(x) {
  return x instanceof Date ? x.valueOf() : x;
}
