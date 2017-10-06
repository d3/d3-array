import {ascending} from "./ascending";
import {bisector}  from "./bisector";

const ascendingBisect = bisector(ascending);
export const bisectRight = ascendingBisect.right;
export const bisectLeft = ascendingBisect.left;
export default bisectRight;
