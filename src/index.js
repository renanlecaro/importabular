/** @private All the events we listen to inside the iframe at the root level.
 * Each one is mapped to the corresponding method on the instance. */
const _events = [
  "mousedown",
  "mouseenter",
  "mouseup",
  "mouseleave",
  "touchstart",
  "touchend",
  "touchmove",
  "keydown",
  "paste",
  "cut",
  "copy",
];

/**
 * Spreadsheet component
 * @param {Object} options
 * @param {Array} options.data Initial data of the table, ie [['A1','A2'],['B1','B2']]
 * @param {Node} options.node Dom node to create the table into
 * @param {Node} options.onChange Callback to run whenever the data
 *               has changed, receives the new data as an argument.
 *@param {Number} options.minRows Minimum number of rows.
 *@param {Number} options.maxRows Maximum number of rows, the table will not grow vertically beyond this.
 *@param {Number} options.minCols Minimum number of columns.
 *@param {Number} options.maxCols Maximum number of columns, the table will not grow horizontally beyond this.
 *@param {String} options.css Css code to add inside the iframe.
 *
 *@param {Object} options.width Width of the iframe that will contain the table.
 *@param {Object} options.height Height of the iframe that will contain the table.
 *
 */
export default class _Importabular {
  constructor({
    data = [],
    node = null,
    onChange = null,
    minRows = 1,
    maxRows = Infinity,
    minCols = 1,
    maxCols = Infinity,
    css = "",
    width = "100%",
    height = "80vh",
  }) {
    if (!node) {
      throw new Error(
        "You need to pass a node argument to Importabular, like this : new Importabular({node: document.body})"
      );
    }
    // Reference to the parent DOM element, contains the iframe
    this._parent = node;
    this._options = {
      onChange,
      minRows,
      maxRows,
      minCols,
      maxCols,
      css: _defaultCss + css,
    };
    this._iframeStyle = {
      width,
      height,
      border: "none",
      background: "transparent",
    };

    /** @private {Number} Current number of columns of the table. */
    this._width = 1;

    /** @private {Number} Current number of rows of the table. */
    this._height = 1;

    /** @private {_LooseArray} Current content of the table, stored as 2D map.*/
    this._data = new _LooseArray();

    this._setupDom();
    this._replaceDataWithArray(data);
    this._incrementToFit({
      x: this._options.minCols - 1,
      y: this._options.minRows - 1,
    });
    this._fillScrollSpace();
  }

  /** @private Checks whether this cell should be editable, or if it's out of bounds*/
  _fitBounds({ x, y }) {
    return (
      x >= 0 && x < this._options.maxCols && y >= 0 && y < this._options.maxRows
    );
  }

  /** @private Fill the iframe visible window with empty cells*/
  _fillScrollSpace() {
    const rows = Math.ceil(this.iframe.contentWindow.innerHeight / 40);
    const cols = Math.ceil(this.iframe.contentWindow.innerWidth / 100);
    this._incrementToFit({ x: cols - 1, y: rows - 1 });
  }

  /** @private Runs the onchange callback*/
  _onDataChanged() {
    if (this._options.onChange) this._options.onChange(this._data._toArr());
  }

  /** @private Create a div with the cell content and correct style */
  _renderTDContent(td, x, y) {
    const div = document.createElement("div");
    td.setAttribute("x", x.toString());
    td.setAttribute("y", y.toString());
    const val = this._getVal(x, y);
    if (val) {
      div.textContent = val;
    } else {
      // Force no collapse of cell
      div.innerHTML = "&nbsp;";
    }
    td.appendChild(div);
    this._restyle({ x, y });
  }

  /** @private Initial dom setup */
  _setupDom() {
    // We wrap the table in an iframe mostly to let the browser
    // handle the focus for us, without the need for a hidden
    // input. It also makes sure that the style of the table is "clean"
    // but makes it harder to style the content.
    const iframe = document.createElement("iframe");
    this.iframe = iframe;
    this._parent.appendChild(iframe);
    const cwd = iframe.contentWindow.document;
    this.cwd = cwd;
    cwd.open();
    cwd.write(
      `<html lang="${navigator.language}"><body><style>${this._options.css}</style></body></html>`
    );
    cwd.close();
    Object.assign(iframe.style, this._iframeStyle);

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    table.appendChild(tbody);
    cwd.body.appendChild(table);
    this.tbody = tbody;
    this.table = table;

    for (let y = 0; y < this._height; y++) {
      const tr = document.createElement("tr");
      tbody.appendChild(tr);
      for (let x = 0; x < this._width; x++) {
        this._addCell(tr, x, y);
      }
    }

    _events.forEach((name) => cwd.addEventListener(name, this[name], true));
  }

  /** Destroys the table, and clears even listeners
   * @public
   * */
  destroy() {
    this._destroyEditing();

    _events.forEach((name) =>
      this.cwd.removeEventListener(name, this[name], true)
    );

    this.iframe.parentElement.removeChild(this.iframe);
  }

  /** @private Creates a TD, sets its content and adds it to the TR */
  _addCell(tr, x, y) {
    const td = document.createElement("td");
    tr.appendChild(td);
    this._renderTDContent(td, x, y);
  }

  _incrementHeight() {
    if (!this._fitBounds({ x: 0, y: this._height })) return false;
    this._height++;
    const y = this._height - 1;
    const tr = document.createElement("tr");

    this.tbody.appendChild(tr);
    for (let x = 0; x < this._width; x++) {
      this._addCell(tr, x, y);
    }
    return true;
  }

  _incrementWidth() {
    if (!this._fitBounds({ x: this._width, y: 0 })) return false;
    this._width++;
    const x = this._width - 1;
    Array.prototype.forEach.call(this.tbody.children, (tr, y) => {
      this._addCell(tr, x, y);
    });
    return true;
  }
  /** @private Makes the table bigger to contain a cell for those coordinates*/
  _incrementToFit({ x, y }) {
    while (x > this._width - 1 && this._incrementWidth());
    while (y > this._height - 1 && this._incrementHeight());
  }

  /** @private Handles the paste event on the node.*/
  paste = (e) => {
    if (this._editing) return;
    e.preventDefault();
    const rows = _parsePasteEvent(e);
    const { rx, ry } = this._selection;
    const offset = { x: rx[0], y: ry[0] };

    for (let y = 0; y < rows.length; y++)
      // Using the first column here makes sure that
      // if the paste data had various row length, we only
      // paste a clean rectangle
      for (let x = 0; x < rows[0].length; x++)
        this._setVal(offset.x + x, offset.y + y, rows[y][x]);

    this._changeSelectedCellsStyle(() => {
      this._selectionStart = offset;
      this._selectionEnd = {
        x: offset.x + rows[0].length - 1,
        y: offset.y + rows.length - 1,
      };
    });
    this._onDataChanged();
  };

  /** @private Returns the currently selected cells as a 2D array of strings.*/
  _getSelectionAsArray() {
    const { rx, ry } = this._selection;
    if (rx[0] === rx[1]) return null;
    const width = rx[1] - rx[0];
    const height = ry[1] - ry[0];
    const result = [];
    for (let y = 0; y < height; y++) {
      result.push([]);
      for (let x = 0; x < width; x++) {
        result[y].push(this._getVal(rx[0] + x, ry[0] + y));
      }
    }
    return result;
  }

  /** @private Called when the copy even happens in the iframe.*/
  copy = (e) => {
    if (this._editing) return;
    const asArr = this._getSelectionAsArray();
    if (asArr) {
      e.preventDefault();
      e.clipboardData.setData("text/html", _arrToHTML(asArr));
      e.clipboardData.setData(
        "text/plain",
        asArr.map((row) => row.join("")).join("\n")
      );
    }
  };

  /** @private Called when the cut even happens in the iframe.
   * Runs the copy method and then clears the cells.
   * */
  cut = (e) => {
    if (this._editing) return;
    this.copy(e);
    this._setAllSelectedCellsTo("");
  };

  keydown = (e) => {
    if (e.ctrlKey) return;

    if (this._selectionStart) {
      if (e.key === "Escape" && this._editing) {
        e.preventDefault();
        this._revertEdit();
        this._stopEditing();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        this._tabCursorInSelection(false, e.shiftKey ? -1 : 1);
      }

      if (e.key === "Tab") {
        e.preventDefault();
        this._tabCursorInSelection(true, e.shiftKey ? -1 : 1);
      }
      if (!this._editing) {
        if (e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          this._setAllSelectedCellsTo("");
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this._moveCursor({ y: 1 }, e.shiftKey);
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          this._moveCursor({ y: -1 }, e.shiftKey);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          this._moveCursor({ x: -1 }, e.shiftKey);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          this._moveCursor({ x: +1 }, e.shiftKey);
        }
      }

      if (e.key.length === 1 && !this._editing) {
        this._changeSelectedCellsStyle(() => {
          const { x, y } = this._focus;
          // We clear the value of the cell, and the keyup event will
          // happen with the cursor inside the cell and type the character there
          this._startEditing({ x, y });
          this._getCell(x, y).firstChild.value = "";
        });
      }
    }
  };

  _setAllSelectedCellsTo(value) {
    this._forSelectionCoord(this._selection, ({ x, y }) =>
      this._setVal(x, y, value)
    );
    this._forSelectionCoord(this._selection, this._refreshDisplayedValue);

    this._onDataChanged();
  }

  _moveCursor({ x = 0, y = 0 }, shiftSelectionEnd) {
    const curr = shiftSelectionEnd ? this._selectionEnd : this._selectionStart;
    const nc = { x: curr.x + x, y: curr.y + y };
    if (!this._fitBounds(nc)) return;
    this._stopEditing();
    this._incrementToFit(nc);
    this._changeSelectedCellsStyle(() => {
      if (shiftSelectionEnd) {
        this._selectionEnd = nc;
      } else {
        this._selectionStart = this._selectionEnd = this._focus = nc;
      }
    });
    this._scrollIntoView(nc);
  }

  _tabCursorInSelection(horizontal, delta = 1) {
    // if (this._selectionSize() <= 1) {
    //   return this._moveCursor(horizontal? { x: delta, y: 0 }:{ x:0, y: delta });
    // }
    let { x, y } = this._focus || { x: 0, y: 0 };
    const selectionSize = this._selectionSize();
    const { rx, ry } =
      selectionSize > 1
        ? this._selection
        : {
            rx: [0, this._options.maxCols],
            ry: [0, this._options.maxRows],
          };

    let nc;
    if (horizontal) {
      nc = _shift(x, y, delta, rx[0], rx[1] - 1, ry[0], ry[1] - 1);
    } else {
      // use the same logic, but with x and y inverted for the horizontal tabbing wiht enter/ shift enter
      const temporaryCursor = _shift(
        y,
        x,
        delta,
        ry[0],
        ry[1] - 1,
        rx[0],
        rx[1] - 1
      );
      nc = {
        x: temporaryCursor.y,
        y: temporaryCursor.x,
      };
    }

    if (!this._fitBounds(nc)) return;
    this._stopEditing();
    this._incrementToFit(nc);
    this._changeSelectedCellsStyle(() => {
      this._focus = nc;
      if (selectionSize <= 1) {
        this._selectionStart = this._selectionEnd = nc;
      }
    });
    this._scrollIntoView(nc);
  }

  _scrollIntoView({ x, y }) {
    this._getCell(x, y).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  _selecting = false;
  _selectionStart = null;
  _selectionEnd = null;
  _selection = { rx: [0, 0], ry: [0, 0] };
  _editing = null;
  _focus = null;

  mousedown = (e) => {
    if (this.mobile) return;
    if (e.which === 3 && !this._editing && this._selectionSize()) {
      // select some text to make the browser offer the copy option
      let range = new Range();
      const { rx, ry } = this._selection;
      range.setStart(this._getCell(rx[0], ry[0]), 0);
      range.setEnd(this._getCell(rx[0], ry[0]), 1);
      this.cwd.getSelection().removeAllRanges();
      this.cwd.getSelection().addRange(range);

      return;
    }
    this._changeSelectedCellsStyle(() => {
      this.tbody.style.userSelect = "none";
      this._selectionEnd = this._selectionStart = this._focus = this._getCoords(
        e
      );
      this._selecting = true;
    });
  };
  mouseenter = (e) => {
    if (this.mobile) return;
    if (this._selecting) {
      this._changeSelectedCellsStyle(() => {
        this._selectionEnd = this._getCoords(e);
      });
    }
  };

  _lastMouseUp = null;
  _lastMouseUpTarget = null;

  _endSelection() {
    this._selecting = false;
    this.tbody.style.userSelect = "";
  }

  mouseup = (e) => {
    if (this.mobile) return;
    if (e.which === 3) return;

    if (this._selecting) {
      this._changeSelectedCellsStyle(() => {
        this._selectionEnd = this._getCoords(e);
        this._endSelection();

        if (
          this._lastMouseUp &&
          this._lastMouseUp > Date.now() - 300 &&
          this._lastMouseUpTarget.x === this._selectionEnd.x &&
          this._lastMouseUpTarget.y === this._selectionEnd.y
        ) {
          this._startEditing(this._selectionEnd);
        }
        this._lastMouseUp = Date.now();
        this._lastMouseUpTarget = this._selectionEnd;
      });
    }
  };
  mouseleave = (e) => {
    if (e.target === this.tbody && this._selecting) {
      this._endSelection();
    }
  };

  touchstart = (e) => {
    if (this._editing) return;
    this.mobile = true;
    this.moved = false;
  };
  touchend = (e) => {
    if (!this.mobile) return;
    if (this._editing) return;
    if (!this.moved) {
      this._changeSelectedCellsStyle(() => {
        this._selectionEnd = this._selectionStart = this._focus = this._getCoords(
          e
        );
      });
      this._startEditing(this._focus);
    }
  };
  touchmove = (e) => {
    if (!this.mobile) return;
    this.moved = true;
  };

  _startEditing({ x, y }) {
    this._editing = { x, y };
    const td = this._getCell(x, y);
    const tdSize = td.getBoundingClientRect();
    const cellSize = td.firstChild.getBoundingClientRect();

    Object.assign(td.style, {
      width: tdSize.width - 2,
      height: tdSize.height,
    });

    td.removeChild(td.firstChild);
    const input = document.createElement("input");
    input.type = "text";
    input.value = this._getVal(x, y);

    Object.assign(input.style, {
      width: cellSize.width,
      height: cellSize.height,
    });
    td.appendChild(input);
    input.focus();
    input.addEventListener("blur", this._stopEditing);
    input.addEventListener("keydown", this._blurIfEnter);
  }

  _destroyEditing() {
    if (this._editing) {
      const { x, y } = this._editing;
      const input = this._getCell(x, y).firstChild;
      input.removeEventListener("blur", this._stopEditing);
      input.removeEventListener("keydown", this._blurIfEnter);
    }
  }

  _revertEdit() {
    if (!this._editing) return;
    const { x, y } = this._editing;
    const td = this._getCell(x, y);
    const input = td.firstChild;
    input.value = this._getVal(x, y);
  }

  _stopEditing = () => {
    if (!this._editing) return;
    const { x, y } = this._editing;
    const td = this._getCell(x, y);
    td.style.width = "";
    td.style.height = "";
    const input = td.firstChild;
    input.removeEventListener("blur", this._stopEditing);
    input.removeEventListener("keydown", this._blurIfEnter);
    this._setVal(x, y, input.value);
    td.removeChild(input);
    this._editing = null;
    this._renderTDContent(td, x, y);
    this._onDataChanged();
  };
  _blurIfEnter = (e) => {
    const code = e.keyCode;
    if (code === 13) {
      // enter
      this._stopEditing();
      e.preventDefault();
    }
  };

  _changeSelectedCellsStyle(callback) {
    const oldS = this._selection;
    callback();
    this._selection = this._getSelectionCoords();
    this._forSelectionCoord(oldS, this._restyle);
    this._forSelectionCoord(this._selection, this._restyle);
  }

  _getSelectionCoords() {
    if (!this._selectionStart) return { rx: [0, 0], ry: [0, 0] };
    let rx = [this._selectionStart.x, this._selectionEnd.x];
    if (rx[0] > rx[1]) rx.reverse();
    let ry = [this._selectionStart.y, this._selectionEnd.y];
    if (ry[0] > ry[1]) ry.reverse();
    return { rx: [rx[0], rx[1] + 1], ry: [ry[0], ry[1] + 1] };
  }

  _forSelectionCoord({ rx, ry }, cb) {
    for (let x = rx[0]; x < rx[1]; x++)
      for (let y = ry[0]; y < ry[1]; y++)
        if (this._fitBounds({ x, y })) cb({ x, y });
  }

  _restyle = ({ x, y }) => {
    this._getCell(x, y).className = this._classNames(x, y);
  };

  _selectionSize() {
    const { rx, ry } = this._selection;
    return (rx[1] - rx[0]) * (ry[1] - ry[0]);
  }

  _classNames(x, y) {
    const { rx, ry } = this._selection;
    let classes = "";
    if (x >= rx[0] && x < rx[1] && y >= ry[0] && y < ry[1]) {
      classes += " selected";
      if (this._selectionSize() > 1) {
        classes += " multi";
      }
    }

    if (this._focus && this._focus.x === x && this._focus.y === y) {
      classes += " focus";
    }
    if (this._editing && x === this._editing.x && y === this._editing.y) {
      classes += " editing";
    }

    return classes;
  }

  _refreshDisplayedValue = ({ x, y }) => {
    const div = this._getCell(x, y).firstChild;
    if (div.tagName === "DIV") {
      div.textContent = this._getVal(x, y);
    }
    this._restyle({ x, y });
  };

  _getCoords(e) {
    // Returns the clicked cell coords or null
    let node = e.target;
    while (!node.getAttribute("x") && node.parentElement) {
      node = node.parentElement;
    }
    return {
      x: parseInt(node.getAttribute("x")) || 0,
      y: parseInt(node.getAttribute("y")) || 0,
    };
  }

  /** Replace the current data with the provided 2D array.
   * @param {[[String]]} data the new data, as a 2D array.
   * */
  setData(data) {
    // Empty table
    this._data._clear();
    // paste data
    this._replaceDataWithArray(data);

    // Refresh all cell, including outide of the
    // provided rect, as they've juste been emptied
    for (let x = 0; x < this._width; x++)
      for (let y = 0; y < this._height; y++)
        this._refreshDisplayedValue({ x, y });
  }

  /**Returns the current data as a 2D array
   * @return {[[String]]} data the latest data as a 2D array.
   *
   * */
  getData() {
    return this._data._toArr();
  }

  _replaceDataWithArray(data) {
    data.forEach((line, y) => {
      line.forEach((val, x) => {
        this._setVal(x, y, val);
      });
    });
  }

  _setVal(x, y, val) {
    if (!this._fitBounds({ x, y })) return;

    this._data._setVal(x, y, val);
    this._incrementToFit({ x: x + 1, y: y + 1 });
    this._refreshDisplayedValue({ x, y });
  }

  _getVal(x, y) {
    return this._data._getVal(x, y);
  }

  _getCell(x, y) {
    return this.tbody.children[y].children[x];
  }
}
export function _shift(x, y, deltaX, xMin, xMax, yMin, yMax) {
  x += deltaX;
  if (x < xMin) {
    if (xMax === Infinity) {
      return { x: xMin, y };
    }
    x = xMax;
    y--;
    if (y < yMin) {
      if (yMax === Infinity) {
        return { x: xMin, y: yMin };
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
  return { x, y };
}

export function _parsePasteEvent(event) {
  try {
    const html = (event.clipboardData || window.clipboardData).getData(
      "text/html"
    );

    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    const trs = iframe.contentWindow.document.querySelectorAll("tr");
    const data = [];
    Array.prototype.forEach.call(trs, (tr, y) => {
      const tds = tr.querySelectorAll("td");
      Array.prototype.forEach.call(tds, (td, x) => {
        const text = td.textContent;
        if (!data[y]) data[y] = [];
        data[y][x] = text;
      });
    });

    document.body.removeChild(iframe);
    if (data.length) return data;
  } catch (e) {}

  const fromText = (event.clipboardData || window.clipboardData)
    .getData("text")
    .split(/\r\n|\n|\r/)
    .map((row) => row.split(""));
  return fromText;
}
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

export function _cleanVal(val) {
  if (val === 0) return "0";
  if (!val) return "";
  return val.toString();
}

export function _isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
export function _arrToHTML(arr) {
  const table = document.createElement("table");
  table.setAttribute("lang", navigator.language);
  arr.forEach((row) => {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    row.forEach((cell) => {
      const td = document.createElement("td");
      tr.appendChild(td);
      td.textContent = cell;
    });
  });
  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html lang="${navigator.language}"><head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/><title></title></head><body>${table.outerHTML}</body></html>`;
}
export const _defaultCss = `
html{
  -ms-overflow-style: none;
  scrollbar-width: none;
}
::-webkit-scrollbar {
  visibility: hidden;
}
*{
  box-sizing: border-box;
}
body{
  padding: 0; 
  margin: 0;
}
table{
  border-spacing: 0;
  background: white;
  border: 1px solid #ddd;
  border-width: 0 1px 1px 0;
  font-size: 16px;
  font-family: sans-serif;
  border-collapse: separate;
}
td{
  padding:0;
  border: 1px solid;
  border-color: #ddd transparent transparent #ddd; 
}
td.selected.multi:not(.editing){
  background:#d7f2f9;
} 
td.focus:not(.editing){
  border-color: black;
} 
td>*{
  border:none;
  padding:10px;
  min-width:100px;
  min-height: 40px;
  font:inherit;
  line-height: 20px;
  color:inherit;
  white-space: normal;
}
td>div::selection {
    color: none;
    background: none;
}
`;
