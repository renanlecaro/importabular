


export function _shift(x, y, deltaX, xMin, xMax, yMin, yMax) {
  x += deltaX;
  if (x < xMin) {
    if (xMax === Infinity) {
      return {x: xMin, y};
    }
    x = xMax;
    y--;
    if (y < yMin) {
      if (yMax === Infinity) {
        return {x: xMin, y: yMin};
      }
      y = yMax;
    }
  }
  if (x > xMax) {
    x = xMin;
    y++;
    if (y > yMax) {
      y = yMin;
      x = xMin;
    }
  }
  return {x, y};
}