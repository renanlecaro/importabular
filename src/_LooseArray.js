import { _cleanVal } from "./_cleanVal";
import { _isEmpty } from "./_isEmpty";

export class _LooseArray {
  // An 2D array of strings that only stores non "" values
  _data = {};

  _setVal(x, y, val) {
    const hash = this._data;
    const cleanedVal = _cleanVal(val);
    if (cleanedVal) {
      if (!hash[x]) hash[x] = {};
      hash[x][y] = cleanedVal;
    } else {
      // delete item
      if (hash[x] && hash[x][y]) {
        delete hash[x][y];
        if (_isEmpty(hash[x])) delete hash[x];
      }
    }
  }

  _clear() {
    this._data = {};
  }

  _getVal(x, y) {
    const hash = this._data;
    return (hash && hash[x] && hash[x][y]) || "";
  }

  _toArr() {
    let width = 1,
      height = 1;
    for (let x in this._data) {
      for (let y in this._data[x]) {
        height = Math.max(height, parseInt(y) + 1);
        width = Math.max(width, parseInt(x) + 1);
      }
    }
    const result = [];
    for (let y = 0; y < height; y++) {
      result.push([]);
      for (let x = 0; x < width; x++) {
        result[y].push(this._getVal(x, y));
      }
    }
    return result;
  }
}
