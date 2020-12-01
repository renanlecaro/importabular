export function _cleanVal(val) {
  if (val === 0) return "0";
  if (!val) return "";
  return val.toString();
}
