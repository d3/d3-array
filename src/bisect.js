import bisector from "./bisector";

var ascendingBisect = bisector(ascending);
export default ascendingBisect.right;
export var bisectRight = ascendingBisect.right;
export var bisectLeft = ascendingBisect.left;
