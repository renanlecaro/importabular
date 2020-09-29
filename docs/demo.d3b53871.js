// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/_arrToHTML.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._arrToHTML = _arrToHTML;

function _arrToHTML(arr) {
  var table = document.createElement("table");
  table.setAttribute("lang", navigator.language);
  arr.forEach(function (row) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    row.forEach(function (cell) {
      var td = document.createElement("td");
      tr.appendChild(td);
      td.innerText = cell;
    });
  });
  return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><html lang=\"".concat(navigator.language, "\"><head>\n<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/><title></title></head><body>").concat(table.outerHTML, "</body></html>");
}
},{}],"../src/_LooseArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._cleanVal = _cleanVal;
exports._isEmpty = _isEmpty;
exports._LooseArray = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _LooseArray = /*#__PURE__*/function () {
  function _LooseArray() {
    _classCallCheck(this, _LooseArray);

    _defineProperty(this, "_data", {});
  }

  _createClass(_LooseArray, [{
    key: "_setVal",
    value: function _setVal(x, y, val) {
      var hash = this._data;

      var cleanedVal = _cleanVal(val);

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
  }, {
    key: "_clear",
    value: function _clear() {
      this._data = {};
    }
  }, {
    key: "_getVal",
    value: function _getVal(x, y) {
      var hash = this._data;
      return hash && hash[x] && hash[x][y] || "";
    }
  }, {
    key: "_toArr",
    value: function _toArr() {
      var width = 1,
          height = 1;

      for (var x in this._data) {
        for (var y in this._data[x]) {
          height = Math.max(height, parseInt(y) + 1);
          width = Math.max(width, parseInt(x) + 1);
        }
      }

      var result = [];

      for (var _y = 0; _y < height; _y++) {
        result.push([]);

        for (var _x = 0; _x < width; _x++) {
          result[_y].push(this._getVal(_x, _y));
        }
      }

      return result;
    }
  }]);

  return _LooseArray;
}();

exports._LooseArray = _LooseArray;

function _cleanVal(val) {
  if (val === 0) return "0";
  if (!val) return "";
  return val.toString();
}

function _isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
},{}],"../src/_parsePasteEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._parsePasteEvent = _parsePasteEvent;

function _parsePasteEvent(event) {
  try {
    var html = (event.clipboardData || window.clipboardData).getData("text/html");
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    var trs = iframe.contentWindow.document.querySelectorAll("tr");
    var data = [];
    Array.prototype.forEach.call(trs, function (tr, y) {
      var tds = tr.querySelectorAll("td");
      Array.prototype.forEach.call(tds, function (td, x) {
        var text = td.innerText;
        if (!data[y]) data[y] = [];
        data[y][x] = text;
      });
    });
    document.body.removeChild(iframe);
    if (data.length) return data;
  } catch (e) {}

  var fromText = (event.clipboardData || window.clipboardData).getData("text").split(/\r\n|\n|\r/).map(function (row) {
    return row.split("");
  });
  return fromText;
}
},{}],"../src/_shift.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._shift = _shift;

function _shift(x, y, deltaX, xMin, xMax, yMin, yMax) {
  x += deltaX;

  if (x < xMin) {
    if (xMax === Infinity) {
      return {
        x: xMin,
        y: y
      };
    }

    x = xMax;
    y--;

    if (y < yMin) {
      if (yMax === Infinity) {
        return {
          x: xMin,
          y: yMin
        };
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

  return {
    x: x,
    y: y
  };
}
},{}],"../src/_defaultCss.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._defaultCss = void 0;
var _defaultCss = "\nhtml{\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n::-webkit-scrollbar {\n  visibility: hidden;\n}\n*{\n  box-sizing: border-box;\n}\nbody{\n  padding: 0; \n  margin: 0;\n}\ntable{\n  border-spacing: 0;\n  background: white;\n  border: 1px solid #ddd;\n  border-width: 0 1px 1px 0;\n  font-size: 16px;\n  font-family: sans-serif;\n  border-collapse: separate;\n}\ntd{\n  padding:0;\n  border: 1px solid;\n  border-color: #ddd transparent transparent #ddd; \n}\ntd.selected.multi:not(.editing){\n  background:#d7f2f9;\n} \ntd.focus:not(.editing){\n  border-color: black;\n} \ntd>*{\n  border:none;\n  padding:10px;\n  min-width:100px;\n  min-height: 40px;\n  font:inherit;\n  line-height: 20px;\n  color:inherit;\n  white-space: normal;\n}\ntd>div::selection {\n    color: none;\n    background: none;\n}\n";
exports._defaultCss = _defaultCss;
},{}],"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _arrToHTML2 = require("./_arrToHTML");

var _LooseArray2 = require("./_LooseArray");

var _parsePasteEvent2 = require("./_parsePasteEvent");

var _shift2 = require("./_shift");

var _defaultCss2 = require("./_defaultCss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Importabular = /*#__PURE__*/function () {
  function Importabular(_ref) {
    var _this = this;

    var _ref$data = _ref.data,
        data = _ref$data === void 0 ? [] : _ref$data,
        _ref$node = _ref.node,
        node = _ref$node === void 0 ? null : _ref$node,
        _ref$onChange = _ref.onChange,
        onChange = _ref$onChange === void 0 ? null : _ref$onChange,
        _ref$minRows = _ref.minRows,
        minRows = _ref$minRows === void 0 ? 1 : _ref$minRows,
        _ref$maxRows = _ref.maxRows,
        maxRows = _ref$maxRows === void 0 ? Infinity : _ref$maxRows,
        _ref$minCols = _ref.minCols,
        minCols = _ref$minCols === void 0 ? 1 : _ref$minCols,
        _ref$maxCols = _ref.maxCols,
        maxCols = _ref$maxCols === void 0 ? Infinity : _ref$maxCols,
        _ref$css = _ref.css,
        css = _ref$css === void 0 ? "" : _ref$css,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? "100%" : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? "80vh" : _ref$height;

    _classCallCheck(this, Importabular);

    _defineProperty(this, "_parent", null);

    _defineProperty(this, "_width", 1);

    _defineProperty(this, "_height", 1);

    _defineProperty(this, "_data", new _LooseArray2._LooseArray());

    _defineProperty(this, "_events", ["mousedown", "mouseenter", "mouseup", "mouseleave", "touchstart", "touchend", "touchmove", "keydown", "paste", "cut", "copy"]);

    _defineProperty(this, "paste", function (e) {
      if (_this._editing) return;
      e.preventDefault();
      var rows = (0, _parsePasteEvent2._parsePasteEvent)(e);
      var _this$_selection = _this._selection,
          rx = _this$_selection.rx,
          ry = _this$_selection.ry;
      var offset = {
        x: rx[0],
        y: ry[0]
      };

      for (var y = 0; y < rows.length; y++) {
        // Using the first column here makes sure that
        // if the paste data had various row length, we only
        // paste a clean rectangle
        for (var x = 0; x < rows[0].length; x++) {
          _this._setVal(offset.x + x, offset.y + y, rows[y][x]);
        }
      }

      _this._changeSelectedCellsStyle(function () {
        _this._selectionStart = offset;
        _this._selectionEnd = {
          x: offset.x + rows[0].length - 1,
          y: offset.y + rows.length - 1
        };
      });

      _this._onDataChanged();
    });

    _defineProperty(this, "copy", function (e) {
      if (_this._editing) return;

      var asArr = _this._getSelectionAsArray();

      if (asArr) {
        e.preventDefault();
        e.clipboardData.setData("text/html", (0, _arrToHTML2._arrToHTML)(asArr));
        e.clipboardData.setData("text/plain", asArr.map(function (row) {
          return row.join("");
        }).join("\n"));
      }
    });

    _defineProperty(this, "cut", function (e) {
      if (_this._editing) return;

      _this.copy(e);

      _this._setAllSelectedCellsTo("");
    });

    _defineProperty(this, "keydown", function (e) {
      if (e.ctrlKey) return;

      if (_this._selectionStart) {
        if (e.key === "Escape" && _this._editing) {
          e.preventDefault();

          _this._revertEdit();

          _this._stopEditing();
        }

        if (e.key === "Enter") {
          e.preventDefault();

          _this._tabCursorInSelection(false, e.shiftKey ? -1 : 1);
        }

        if (e.key === "Tab") {
          e.preventDefault();

          _this._tabCursorInSelection(true, e.shiftKey ? -1 : 1);
        }

        if (!_this._editing) {
          if (e.key === "Delete" || e.key === "Backspace") {
            e.preventDefault();

            _this._setAllSelectedCellsTo("");
          }

          if (e.key === "ArrowDown") {
            e.preventDefault();

            _this._moveCursor({
              y: 1
            }, e.shiftKey);
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();

            _this._moveCursor({
              y: -1
            }, e.shiftKey);
          }

          if (e.key === "ArrowLeft") {
            e.preventDefault();

            _this._moveCursor({
              x: -1
            }, e.shiftKey);
          }

          if (e.key === "ArrowRight") {
            e.preventDefault();

            _this._moveCursor({
              x: +1
            }, e.shiftKey);
          }
        }

        if (e.key.length === 1 && !_this._editing) {
          _this._changeSelectedCellsStyle(function () {
            var _this$_focus = _this._focus,
                x = _this$_focus.x,
                y = _this$_focus.y; // We clear the value of the cell, and the keyup event will
            // happen with the cursor inside the cell and type the character there

            _this._startEditing({
              x: x,
              y: y
            });

            _this._getCell(x, y).firstChild.value = "";
          });
        }
      }
    });

    _defineProperty(this, "_selecting", false);

    _defineProperty(this, "_selectionStart", null);

    _defineProperty(this, "_selectionEnd", null);

    _defineProperty(this, "_selection", {
      rx: [0, 0],
      ry: [0, 0]
    });

    _defineProperty(this, "_editing", null);

    _defineProperty(this, "_focus", null);

    _defineProperty(this, "mousedown", function (e) {
      if (_this.mobile) return;

      if (e.which === 3 && !_this._editing && _this._selectionSize()) {
        // select some text to make the browser offer the copy option
        var range = new Range();
        var _this$_selection2 = _this._selection,
            rx = _this$_selection2.rx,
            ry = _this$_selection2.ry;
        range.setStart(_this._getCell(rx[0], ry[0]), 0);
        range.setEnd(_this._getCell(rx[0], ry[0]), 1);

        _this.cwd.getSelection().removeAllRanges();

        _this.cwd.getSelection().addRange(range);

        return;
      }

      _this._changeSelectedCellsStyle(function () {
        _this.tbody.style.userSelect = "none";
        _this._selectionEnd = _this._selectionStart = _this._focus = _this._getCoords(e);
        _this._selecting = true;
      });
    });

    _defineProperty(this, "mouseenter", function (e) {
      if (_this.mobile) return;

      if (_this._selecting) {
        _this._changeSelectedCellsStyle(function () {
          _this._selectionEnd = _this._getCoords(e);
        });
      }
    });

    _defineProperty(this, "_lastMouseUp", null);

    _defineProperty(this, "_lastMouseUpTarget", null);

    _defineProperty(this, "mouseup", function (e) {
      if (_this.mobile) return;
      if (e.which === 3) return;

      if (_this._selecting) {
        _this._changeSelectedCellsStyle(function () {
          _this._selectionEnd = _this._getCoords(e);

          _this._endSelection();

          if (_this._lastMouseUp && _this._lastMouseUp > Date.now() - 300 && _this._lastMouseUpTarget.x === _this._selectionEnd.x && _this._lastMouseUpTarget.y === _this._selectionEnd.y) {
            _this._startEditing(_this._selectionEnd);
          }

          _this._lastMouseUp = Date.now();
          _this._lastMouseUpTarget = _this._selectionEnd;
        });
      }
    });

    _defineProperty(this, "mouseleave", function (e) {
      if (e.target === _this.tbody && _this._selecting) {
        _this._endSelection();
      }
    });

    _defineProperty(this, "touchstart", function (e) {
      if (_this._editing) return;
      _this.mobile = true;
      _this.moved = false;
    });

    _defineProperty(this, "touchend", function (e) {
      if (!_this.mobile) return;
      if (_this._editing) return;

      if (!_this.moved) {
        _this._changeSelectedCellsStyle(function () {
          _this._selectionEnd = _this._selectionStart = _this._focus = _this._getCoords(e);
        });

        _this._startEditing(_this._focus);
      }
    });

    _defineProperty(this, "touchmove", function (e) {
      if (!_this.mobile) return;
      _this.moved = true;
    });

    _defineProperty(this, "_stopEditing", function () {
      if (!_this._editing) return;
      var _this$_editing = _this._editing,
          x = _this$_editing.x,
          y = _this$_editing.y;

      var td = _this._getCell(x, y);

      td.style.width = "";
      td.style.height = "";
      var input = td.firstChild;
      input.removeEventListener("blur", _this._stopEditing);
      input.removeEventListener("keydown", _this._blurIfEnter);

      _this._setVal(x, y, input.value);

      td.removeChild(input);
      _this._editing = null;

      _this._renderTDContent(td, x, y);

      _this._onDataChanged();
    });

    _defineProperty(this, "_blurIfEnter", function (e) {
      var code = e.keyCode;

      if (code === 13) {
        // enter
        _this._stopEditing();

        e.preventDefault();
      }
    });

    _defineProperty(this, "_restyle", function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      _this._getCell(x, y).className = _this._classNames(x, y);
    });

    _defineProperty(this, "_refreshDisplayedValue", function (_ref3) {
      var x = _ref3.x,
          y = _ref3.y;

      var div = _this._getCell(x, y).firstChild;

      if (div.tagName === "DIV") {
        div.innerText = _this._getVal(x, y);
      }

      _this._restyle({
        x: x,
        y: y
      });
    });

    if (!node) return console.error("Please call the constructor like this : new Importabular({node: document.body})");
    this._parent = node;
    this._options = {
      onChange: onChange,
      minRows: minRows,
      maxRows: maxRows,
      minCols: minCols,
      maxCols: maxCols,
      css: _defaultCss2._defaultCss + css
    };
    this._iframeStyle = {
      width: width,
      height: height,
      border: "none",
      background: "transparent"
    };

    this._setupDom();

    this._replaceDataWithArray(data);

    this._incrementToFit({
      x: this._options.minCols - 1,
      y: this._options.minRows - 1
    });

    this._fillScrollSpace();
  }
  /** @private {HTMLElement} Reference to the parent DOM element, contains the iframe. */


  _createClass(Importabular, [{
    key: "_fitBounds",

    /** @private Checks whether this cell should be editable, or if it's out of bounds*/
    value: function _fitBounds(_ref4) {
      var x = _ref4.x,
          y = _ref4.y;
      return x >= 0 && x < this._options.maxCols && y >= 0 && y < this._options.maxRows;
    }
    /** @private Fill the iframe visible window with empty cells*/

  }, {
    key: "_fillScrollSpace",
    value: function _fillScrollSpace() {
      var rows = Math.ceil(this.iframe.contentWindow.innerHeight / 40);
      var cols = Math.ceil(this.iframe.contentWindow.innerWidth / 100);

      this._incrementToFit({
        x: cols - 1,
        y: rows - 1
      });
    }
    /** @private Runs the onchange callback*/

  }, {
    key: "_onDataChanged",
    value: function _onDataChanged() {
      if (this._options.onChange) this._options.onChange(this._data._toArr());
    }
    /** @private Create a div with the cell content and correct style */

  }, {
    key: "_renderTDContent",
    value: function _renderTDContent(td, x, y) {
      var div = document.createElement("div");
      td.setAttribute("x", x.toString());
      td.setAttribute("y", y.toString());

      var val = this._getVal(x, y);

      if (val) {
        div.innerText = val;
      } else {
        // Force no collapse of cell
        div.innerHTML = "&nbsp;";
      }

      td.appendChild(div);

      this._restyle({
        x: x,
        y: y
      });
    }
    /** @private Initial dom setup */

  }, {
    key: "_setupDom",
    value: function _setupDom() {
      var _this2 = this;

      // We wrap the table in an iframe mostly to let the browser
      // handle the focus for us, without the need for a hidden
      // input. It also makes sure that the style of the table is "clean"
      // but makes it harder to style the content.
      var iframe = document.createElement("iframe");
      this.iframe = iframe;

      this._parent.appendChild(iframe);

      var cwd = iframe.contentWindow.document;
      this.cwd = cwd;
      cwd.open();
      cwd.write("<html lang=\"".concat(navigator.language, "\"><body><style>").concat(this._options.css, "</style></body></html>"));
      cwd.close();
      Object.assign(iframe.style, this._iframeStyle);
      var table = document.createElement("table");
      var tbody = document.createElement("tbody");
      table.appendChild(tbody);
      cwd.body.appendChild(table);
      this.tbody = tbody;
      this.table = table;

      for (var y = 0; y < this._height; y++) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);

        for (var x = 0; x < this._width; x++) {
          this._addCell(tr, x, y);
        }
      }

      this._events.forEach(function (name) {
        return cwd.addEventListener(name, _this2[name], true);
      });
    }
    /** @private All the events we listen to inside the iframe at the root level.
     * Each one is mapped to the corresponding method on the instance. */

  }, {
    key: "destroy",

    /** Destroys the table, and clears even listeners
     * @public
     * */
    value: function destroy() {
      var _this3 = this;

      this._destroyEditing();

      this._events.forEach(function (name) {
        return _this3.cwd.removeEventListener(name, _this3[name], true);
      });

      this.iframe.parentElement.removeChild(this.iframe);
    }
    /** @private Creates a TD, sets its content and adds it to the TR */

  }, {
    key: "_addCell",
    value: function _addCell(tr, x, y) {
      var td = document.createElement("td");
      tr.appendChild(td);

      this._renderTDContent(td, x, y);
    }
  }, {
    key: "_incrementHeight",
    value: function _incrementHeight() {
      if (!this._fitBounds({
        x: 0,
        y: this._height
      })) return false;
      this._height++;
      var y = this._height - 1;
      var tr = document.createElement("tr");
      this.tbody.appendChild(tr);

      for (var x = 0; x < this._width; x++) {
        this._addCell(tr, x, y);
      }

      return true;
    }
  }, {
    key: "_incrementWidth",
    value: function _incrementWidth() {
      var _this4 = this;

      if (!this._fitBounds({
        x: this._width,
        y: 0
      })) return false;
      this._width++;
      var x = this._width - 1;
      Array.prototype.forEach.call(this.tbody.children, function (tr, y) {
        _this4._addCell(tr, x, y);
      });
      return true;
    }
    /** @private Makes the table bigger to contain a cell for those coordinates*/

  }, {
    key: "_incrementToFit",
    value: function _incrementToFit(_ref5) {
      var x = _ref5.x,
          y = _ref5.y;

      while (x > this._width - 1 && this._incrementWidth()) {
        ;
      }

      while (y > this._height - 1 && this._incrementHeight()) {
        ;
      }
    }
    /** @private Handles the paste event on the node.*/

  }, {
    key: "_getSelectionAsArray",

    /** @private Returns the currently selected cells as a 2D array of strings.*/
    value: function _getSelectionAsArray() {
      var _this$_selection3 = this._selection,
          rx = _this$_selection3.rx,
          ry = _this$_selection3.ry;
      if (rx[0] === rx[1]) return null;
      var width = rx[1] - rx[0];
      var height = ry[1] - ry[0];
      var result = [];

      for (var y = 0; y < height; y++) {
        result.push([]);

        for (var x = 0; x < width; x++) {
          result[y].push(this._getVal(rx[0] + x, ry[0] + y));
        }
      }

      return result;
    }
    /** @private Called when the copy even happens in the iframe.*/

  }, {
    key: "_setAllSelectedCellsTo",
    value: function _setAllSelectedCellsTo(value) {
      var _this5 = this;

      this._forSelectionCoord(this._selection, function (_ref6) {
        var x = _ref6.x,
            y = _ref6.y;
        return _this5._setVal(x, y, value);
      });

      this._forSelectionCoord(this._selection, this._refreshDisplayedValue);

      this._onDataChanged();
    }
  }, {
    key: "_moveCursor",
    value: function _moveCursor(_ref7, shiftSelectionEnd) {
      var _this6 = this;

      var _ref7$x = _ref7.x,
          x = _ref7$x === void 0 ? 0 : _ref7$x,
          _ref7$y = _ref7.y,
          y = _ref7$y === void 0 ? 0 : _ref7$y;
      var curr = shiftSelectionEnd ? this._selectionEnd : this._selectionStart;
      var nc = {
        x: curr.x + x,
        y: curr.y + y
      };
      if (!this._fitBounds(nc)) return;

      this._stopEditing();

      this._incrementToFit(nc);

      this._changeSelectedCellsStyle(function () {
        if (shiftSelectionEnd) {
          _this6._selectionEnd = nc;
        } else {
          _this6._selectionStart = _this6._selectionEnd = _this6._focus = nc;
        }
      });

      this._scrollIntoView(nc);
    }
  }, {
    key: "_tabCursorInSelection",
    value: function _tabCursorInSelection(horizontal) {
      var _this7 = this;

      var delta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      // if (this._selectionSize() <= 1) {
      //   return this._moveCursor(horizontal? { x: delta, y: 0 }:{ x:0, y: delta });
      // }
      var _ref8 = this._focus || {
        x: 0,
        y: 0
      },
          x = _ref8.x,
          y = _ref8.y;

      var selectionSize = this._selectionSize();

      var _ref9 = selectionSize > 1 ? this._selection : {
        rx: [0, this._options.maxCols],
        ry: [0, this._options.maxRows]
      },
          rx = _ref9.rx,
          ry = _ref9.ry;

      var nc;

      if (horizontal) {
        nc = (0, _shift2._shift)(x, y, delta, rx[0], rx[1] - 1, ry[0], ry[1] - 1);
      } else {
        // use the same logic, but with x and y inverted for the horizontal tabbing wiht enter/ shift enter
        var temporaryCursor = (0, _shift2._shift)(y, x, delta, ry[0], ry[1] - 1, rx[0], rx[1] - 1);
        nc = {
          x: temporaryCursor.y,
          y: temporaryCursor.x
        };
      }

      if (!this._fitBounds(nc)) return;

      this._stopEditing();

      this._incrementToFit(nc);

      this._changeSelectedCellsStyle(function () {
        _this7._focus = nc;

        if (selectionSize <= 1) {
          _this7._selectionStart = _this7._selectionEnd = nc;
        }
      });

      this._scrollIntoView(nc);
    }
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(_ref10) {
      var x = _ref10.x,
          y = _ref10.y;

      this._getCell(x, y).scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, {
    key: "_endSelection",
    value: function _endSelection() {
      this._selecting = false;
      this.tbody.style.userSelect = "";
    }
  }, {
    key: "_startEditing",
    value: function _startEditing(_ref11) {
      var x = _ref11.x,
          y = _ref11.y;
      this._editing = {
        x: x,
        y: y
      };

      var td = this._getCell(x, y);

      var tdSize = td.getBoundingClientRect();
      var cellSize = td.firstChild.getBoundingClientRect();
      Object.assign(td.style, {
        width: tdSize.width - 2,
        height: tdSize.height
      });
      td.removeChild(td.firstChild);
      var input = document.createElement("input");
      input.type = "text";
      input.value = this._getVal(x, y);
      Object.assign(input.style, {
        width: cellSize.width,
        height: cellSize.height
      });
      td.appendChild(input);
      input.focus();
      input.addEventListener("blur", this._stopEditing);
      input.addEventListener("keydown", this._blurIfEnter);
    }
  }, {
    key: "_destroyEditing",
    value: function _destroyEditing() {
      if (this._editing) {
        var _this$_editing2 = this._editing,
            x = _this$_editing2.x,
            y = _this$_editing2.y;

        var input = this._getCell(x, y).firstChild;

        input.removeEventListener("blur", this._stopEditing);
        input.removeEventListener("keydown", this._blurIfEnter);
      }
    }
  }, {
    key: "_revertEdit",
    value: function _revertEdit() {
      if (!this._editing) return;
      var _this$_editing3 = this._editing,
          x = _this$_editing3.x,
          y = _this$_editing3.y;

      var td = this._getCell(x, y);

      var input = td.firstChild;
      input.value = this._getVal(x, y);
    }
  }, {
    key: "_changeSelectedCellsStyle",
    value: function _changeSelectedCellsStyle(callback) {
      var oldS = this._selection;
      callback();
      this._selection = this._getSelectionCoords();

      this._forSelectionCoord(oldS, this._restyle);

      this._forSelectionCoord(this._selection, this._restyle);
    }
  }, {
    key: "_getSelectionCoords",
    value: function _getSelectionCoords() {
      if (!this._selectionStart) return {
        rx: [0, 0],
        ry: [0, 0]
      };
      var rx = [this._selectionStart.x, this._selectionEnd.x];
      if (rx[0] > rx[1]) rx.reverse();
      var ry = [this._selectionStart.y, this._selectionEnd.y];
      if (ry[0] > ry[1]) ry.reverse();
      return {
        rx: [rx[0], rx[1] + 1],
        ry: [ry[0], ry[1] + 1]
      };
    }
  }, {
    key: "_forSelectionCoord",
    value: function _forSelectionCoord(_ref12, cb) {
      var rx = _ref12.rx,
          ry = _ref12.ry;

      for (var x = rx[0]; x < rx[1]; x++) {
        for (var y = ry[0]; y < ry[1]; y++) {
          if (this._fitBounds({
            x: x,
            y: y
          })) cb({
            x: x,
            y: y
          });
        }
      }
    }
  }, {
    key: "_selectionSize",
    value: function _selectionSize() {
      var _this$_selection4 = this._selection,
          rx = _this$_selection4.rx,
          ry = _this$_selection4.ry;
      return (rx[1] - rx[0]) * (ry[1] - ry[0]);
    }
  }, {
    key: "_classNames",
    value: function _classNames(x, y) {
      var _this$_selection5 = this._selection,
          rx = _this$_selection5.rx,
          ry = _this$_selection5.ry;
      var classes = "";

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
  }, {
    key: "_getCoords",
    value: function _getCoords(e) {
      // Returns the clicked cell coords or null
      var node = e.target;

      while (!node.getAttribute("x") && node.parentElement) {
        node = node.parentElement;
      }

      return {
        x: parseInt(node.getAttribute("x")) || 0,
        y: parseInt(node.getAttribute("y")) || 0
      };
    }
    /** Replace the current data with the provided 2D array.
     * @param {[[String]]} data the new data, as a 2D array.
     * */

  }, {
    key: "setData",
    value: function setData(data) {
      // Empty table
      this._data._clear(); // paste data


      this._replaceDataWithArray(data); // Refresh all cell, including outide of the
      // provided rect, as they've juste been emptied


      for (var x = 0; x < this._width; x++) {
        for (var y = 0; y < this._height; y++) {
          this._refreshDisplayedValue({
            x: x,
            y: y
          });
        }
      }
    }
    /**Returns the current data as a 2D array
     * @return {[[String]]} data the latest data as a 2D array.
     *
     * */

  }, {
    key: "getData",
    value: function getData() {
      return this._data._toArr();
    }
  }, {
    key: "_replaceDataWithArray",
    value: function _replaceDataWithArray(data) {
      var _this8 = this;

      data.forEach(function (line, y) {
        line.forEach(function (val, x) {
          _this8._setVal(x, y, val);
        });
      });
    }
  }, {
    key: "_setVal",
    value: function _setVal(x, y, val) {
      if (!this._fitBounds({
        x: x,
        y: y
      })) return;

      this._data._setVal(x, y, val);

      this._incrementToFit({
        x: x + 1,
        y: y + 1
      });

      this._refreshDisplayedValue({
        x: x,
        y: y
      });
    }
  }, {
    key: "_getVal",
    value: function _getVal(x, y) {
      return this._data._getVal(x, y);
    }
  }, {
    key: "_getCell",
    value: function _getCell(x, y) {
      return this.tbody.children[y].children[x];
    }
  }]);

  return Importabular;
}();

exports.default = Importabular;
},{"./_arrToHTML":"../src/_arrToHTML.js","./_LooseArray":"../src/_LooseArray.js","./_parsePasteEvent":"../src/_parsePasteEvent.js","./_shift":"../src/_shift.js","./_defaultCss":"../src/_defaultCss.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"demo.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"demo.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("../src/index.js"));

require("./demo.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.sheet = new _index.default({
  data: [["Product ID", "Product name", "Price", "Unit", "Category"], ["256", "Sample product", "2.5", "Piece", "Stuffs"], ["122", "Pre mix drink", "5", "Bottle", "Drinks"]],
  node: document.getElementById("editorNode"),
  maxCols: 5
});
console.info("\n\nYou can play around with the instance on the page, try :\n\nsheet.getData()\nsheet.setData([['Hello','World']])\nsheet.destroy()\n\n");
Array.prototype.forEach.call(document.getElementsByClassName("readable"), function (n) {
  var pre = document.createElement("pre");
  pre.className = "auto";
  var js = n.innerText.trim().replace('from "./dist/index.js"', 'from "importabular"').replace('from "./src/index.js"', 'from "importabular/src/index.js"');
  var lines = js.split("\n");
  var offset = lines[1].match(/ +/)[0].length;
  js = lines.map(function (l, i) {
    return i ? l.slice(0, offset).trim() ? l.trim() : l.slice(offset) : l;
  }).join("\n");
  pre.innerText = js;
  n.parentElement.appendChild(pre);
});
},{"../src/index.js":"../src/index.js","./demo.css":"demo.css"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39103" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","demo.js"], null)
//# sourceMappingURL=/demo.d3b53871.js.map