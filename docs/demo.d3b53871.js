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
})({"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Importabular = /*#__PURE__*/function () {
  _createClass(Importabular, [{
    key: "fitBounds",
    value: function fitBounds(_ref) {
      var x = _ref.x,
          y = _ref.y;
      return x >= 0 && x < this.options.maxWidth && y >= 0 && y < this.options.maxHeight;
    }
  }]);

  function Importabular(_ref2) {
    var _this = this;

    var _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        node = _ref2.node,
        options = _objectWithoutProperties(_ref2, ["data", "node"]);

    _classCallCheck(this, Importabular);

    _defineProperty(this, "parent", null);

    _defineProperty(this, "width", 1);

    _defineProperty(this, "height", 1);

    _defineProperty(this, "data", new LooseArray());

    _defineProperty(this, "options", {
      onChange: null,
      onSelectionChange: null,
      contentStyle: function contentStyle() {
        return null;
      },
      cellStyle: function cellStyle() {
        return null;
      },
      minHeight: 1,
      maxHeight: Infinity,
      minWidth: 1,
      maxWidth: Infinity
    });

    _defineProperty(this, "tableStyle", {
      borderSpacing: 0,
      background: 'white',
      border: '1px solid #ddd'
    });

    _defineProperty(this, "paste", function (e) {
      if (_this.editing) return;
      e.preventDefault();
      var rows = parsePasteEvent(e);
      var _this$selection = _this.selection,
          rx = _this$selection.rx,
          ry = _this$selection.ry;
      var offset = {
        x: rx[0],
        y: ry[0]
      };
      rows.forEach(function (row, y) {
        row.forEach(function (val, x) {
          _this.setVal(offset.x + x, offset.y + y, val);
        });
      });

      _this.changeSelectedCellsStyle(function () {
        _this.selectionStart = offset;
        _this.selectionEnd = {
          x: offset.x + rows[0].length - 1,
          y: offset.y + rows.length - 1
        };
      });

      _this.onDataChanged();
    });

    _defineProperty(this, "copy", function (e) {
      var asArr = _this.getSelectionAsArray();

      if (asArr) {
        e.preventDefault();
        e.clipboardData.setData('text/html', arrToHTML(asArr));
        e.clipboardData.setData('text/plain', asArr.map(function (row) {
          return row.join('\t');
        }).join('\n'));
      }
    });

    _defineProperty(this, "cut", function (e) {
      _this.copy(e);

      _this.setAllSelectedCellsTo('');
    });

    _defineProperty(this, "keydown", function (e) {
      if (e.ctrlKey) return;

      if (_this.selectionStart) {
        if (e.key === 'Escape' && _this.editing) {
          e.preventDefault();

          _this.revertEdit();

          _this.stopEditing();
        }

        if (e.key === 'Enter') {
          e.preventDefault();

          _this.moveCursor({
            y: 1
          });
        }

        if (e.key === 'Tab') {
          e.preventDefault();

          _this.moveCursor({
            x: e.shiftKey ? -1 : 1
          });
        }

        if (!_this.editing) {
          if (e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();

            _this.setAllSelectedCellsTo('');
          }

          if (e.key === 'ArrowDown') {
            e.preventDefault();

            _this.moveCursor({
              y: 1
            }, e.shiftKey);
          }

          if (e.key === 'ArrowUp') {
            e.preventDefault();

            _this.moveCursor({
              y: -1
            }, e.shiftKey);
          }

          if (e.key === 'ArrowLeft') {
            e.preventDefault();

            _this.moveCursor({
              x: -1
            }, e.shiftKey);
          }

          if (e.key === 'ArrowRight') {
            e.preventDefault();

            _this.moveCursor({
              x: +1
            }, e.shiftKey);
          }
        }

        if (e.key.length === 1 && !_this.editing) {
          _this.changeSelectedCellsStyle(function () {
            var _this$selectionStart = _this.selectionStart,
                x = _this$selectionStart.x,
                y = _this$selectionStart.y; // We clear the value of the cell, and the keyup event will
            // happen with the cursor inside the cell and type the character there

            _this.startEditing({
              x: x,
              y: y
            });

            _this.getCell(x, y).firstChild.value = '';
          });
        }
      }
    });

    _defineProperty(this, "selecting", false);

    _defineProperty(this, "selectionStart", null);

    _defineProperty(this, "selectionEnd", null);

    _defineProperty(this, "selection", {
      rx: [0, 0],
      ry: [0, 0]
    });

    _defineProperty(this, "editing", null);

    _defineProperty(this, "mousedown", function (e) {
      _this.changeSelectedCellsStyle(function () {
        _this.tbody.style.userSelect = 'none';
        _this.selectionStart = _this.getCoords(e);
        _this.selectionEnd = _this.selectionStart;
        _this.selecting = true;
      });
    });

    _defineProperty(this, "mouseenter", function (e) {
      if (_this.selecting) {
        _this.changeSelectedCellsStyle(function () {
          _this.selectionEnd = _this.getCoords(e);
        });
      }
    });

    _defineProperty(this, "lastMouseUp", null);

    _defineProperty(this, "lastMouseUpTarget", null);

    _defineProperty(this, "mouseup", function (e) {
      if (_this.selecting) {
        _this.changeSelectedCellsStyle(function () {
          _this.selectionEnd = _this.getCoords(e);

          _this.endSelection();

          if (_this.lastMouseUp && _this.lastMouseUp > Date.now() - 300 && _this.lastMouseUpTarget.x === _this.selectionEnd.x && _this.lastMouseUpTarget.y === _this.selectionEnd.y) {
            _this.startEditing(_this.selectionEnd);
          }

          _this.lastMouseUp = Date.now();
          _this.lastMouseUpTarget = _this.selectionEnd;
        });
      }
    });

    _defineProperty(this, "mouseleave", function (e) {
      if (_this.selecting) {
        _this.endSelection();
      }
    });

    _defineProperty(this, "stopEditing", function () {
      if (!_this.editing) return;
      var _this$editing = _this.editing,
          x = _this$editing.x,
          y = _this$editing.y;

      var td = _this.getCell(x, y);

      var input = td.firstChild;
      input.removeEventListener('blur', _this.stopEditing);
      input.removeEventListener('keydown', _this.blurIfEnter);

      _this.setVal(x, y, input.value);

      td.removeChild(input);
      _this.editing = null;

      _this.renderTDContent(td, x, y);

      _this.onDataChanged();
    });

    _defineProperty(this, "blurIfEnter", function (e) {
      var code = e.keyCode;

      if (code === 13) {
        // enter
        _this.stopEditing();

        e.preventDefault();
      }
    });

    _defineProperty(this, "restyle", function (_ref3) {
      var x = _ref3.x,
          y = _ref3.y;

      var status = _this.getStatus(x, y);

      var cell = _this.getCell(x, y);

      Object.assign(cell.style, _this.TDStyle(x, y, status));
      Object.assign(cell.firstChild.style, _this.contentStyle(x, y, status));
    });

    _defineProperty(this, "refreshDisplayedValue", function (_ref4) {
      var x = _ref4.x,
          y = _ref4.y;

      var div = _this.getCell(x, y).firstChild;

      if (div.tagName === 'DIV') {
        div.innerText = _this.getVal(x, y);
      }

      _this.restyle({
        x: x,
        y: y
      });
    });

    this.parent = node;
    Object.assign(this.options, options);
    this.setupDom();
    this.replaceDataWithArray(data);
    this.incrementToFit({
      x: this.options.minWidth - 1,
      y: this.options.minHeight - 1
    });
  }

  _createClass(Importabular, [{
    key: "onDataChanged",
    value: function onDataChanged() {
      if (this.options.onChange) {
        this.options.onChange(this.data.toArr());
      }
    }
  }, {
    key: "setData",
    value: function setData(data) {
      var _this2 = this;

      this.data.clear();
      data.forEach(function (row, y) {
        return row.forEach(function (val, x) {
          return _this2.setVal(x, y, val);
        });
      });

      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          this.refreshDisplayedValue({
            x: x,
            y: y
          });
        }
      }
    }
  }, {
    key: "renderTDContent",
    value: function renderTDContent(td, x, y) {
      var div = document.createElement('div');
      td.setAttribute('x', x.toString());
      td.setAttribute('y', y.toString());
      var val = this.getVal(x, y);

      if (val) {
        div.innerText = val;
      } else {
        // Force no collapse of cell
        div.innerHTML = '&nbsp;';
      }

      td.appendChild(div);
      this.restyle({
        x: x,
        y: y
      });
    }
  }, {
    key: "setupDom",
    value: function setupDom() {
      var table = document.createElement('table');
      var tbody = document.createElement('tbody');
      Object.assign(table.style, this.tableStyle);
      table.appendChild(tbody);
      this.parent.appendChild(table);
      this.tbody = tbody;
      this.table = table;

      for (var y = 0; y < this.height; y++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);

        for (var x = 0; x < this.width; x++) {
          this.addCell(tr, x, y);
        }
      }

      tbody.addEventListener('mousedown', this.mousedown, true);
      tbody.addEventListener('mouseenter', this.mouseenter, true);
      tbody.addEventListener('mouseup', this.mouseup, true);
      tbody.addEventListener('mouseleave', this.mouseleave);
      document.addEventListener('keydown', this.keydown, true);
      document.addEventListener('paste', this.paste);
      document.addEventListener('cut', this.cut);
      document.addEventListener('copy', this.copy);
    }
  }, {
    key: "addCell",
    value: function addCell(tr, x, y) {
      var td = document.createElement('td');
      tr.appendChild(td);
      this.renderTDContent(td, x, y);
    }
  }, {
    key: "incrementHeight",
    value: function incrementHeight() {
      this.height++;
      var y = this.height - 1;
      var tr = document.createElement('tr');
      this.tbody.appendChild(tr);

      for (var x = 0; x < this.width; x++) {
        this.addCell(tr, x, y);
      }
    }
  }, {
    key: "incrementWidth",
    value: function incrementWidth() {
      var _this3 = this;

      this.width++;
      var x = this.width - 1;
      Array.prototype.forEach.call(this.tbody.children, function (tr, y) {
        _this3.addCell(tr, x, y);
      });
    }
  }, {
    key: "incrementToFit",
    value: function incrementToFit(_ref5) {
      var x = _ref5.x,
          y = _ref5.y;
      if (!this.fitBounds({
        x: x,
        y: y
      })) return;

      while (x > this.width - 1) {
        this.incrementWidth();
      }

      while (y > this.height - 1) {
        this.incrementHeight();
      }
    }
  }, {
    key: "getSelectionAsArray",
    value: function getSelectionAsArray() {
      var _this$selection2 = this.selection,
          rx = _this$selection2.rx,
          ry = _this$selection2.ry;
      if (rx[0] === rx[1]) return null;
      var width = rx[1] - rx[0];
      var height = ry[1] - ry[0];
      var result = [];

      for (var y = 0; y < height; y++) {
        result.push([]);

        for (var x = 0; x < width; x++) {
          result[y].push(this.getVal(rx[0] + x, ry[0] + y));
        }
      }

      return result;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyEditing(); // Remove global listeners

      var tbody = this.tbody;
      tbody.removeEventListener('mousedown', this.mousedown, true);
      tbody.removeEventListener('mouseenter', this.mouseenter, true);
      tbody.removeEventListener('mouseup', this.mouseup, true);
      tbody.removeEventListener('mouseleave', this.mouseleave);
      document.removeEventListener('keydown', this.keydown, true);
      document.removeEventListener('copy', this.copy);
      document.removeEventListener('cut', this.cut);
      document.removeEventListener('paste', this.paste);
      this.table.parentElement.removeChild(this.table);
    }
  }, {
    key: "setAllSelectedCellsTo",
    value: function setAllSelectedCellsTo(value) {
      var _this4 = this;

      this.forSelectionCoord(this.selection, function (_ref6) {
        var x = _ref6.x,
            y = _ref6.y;
        return _this4.setVal(x, y, value);
      });
      this.forSelectionCoord(this.selection, this.refreshDisplayedValue);
      this.onDataChanged();
    }
  }, {
    key: "moveCursor",
    value: function moveCursor(_ref7, shiftSelectionEnd) {
      var _this5 = this;

      var _ref7$x = _ref7.x,
          x = _ref7$x === void 0 ? 0 : _ref7$x,
          _ref7$y = _ref7.y,
          y = _ref7$y === void 0 ? 0 : _ref7$y;
      var curr = shiftSelectionEnd ? this.selectionEnd : this.selectionStart;
      var nc = {
        x: curr.x + x,
        y: curr.y + y
      };
      if (!this.fitBounds(nc)) return;
      this.stopEditing();
      this.incrementToFit(nc); // if(nc.x>=this.width) return;
      // if(nc.y>=this.height) return;

      this.changeSelectedCellsStyle(function () {
        if (shiftSelectionEnd) {
          _this5.selectionEnd = nc;
        } else {
          _this5.selectionStart = _this5.selectionEnd = nc;
        }
      });
    }
  }, {
    key: "endSelection",
    value: function endSelection() {
      this.selecting = false;
      this.tbody.style.userSelect = '';
    }
  }, {
    key: "startEditing",
    value: function startEditing(_ref8) {
      var x = _ref8.x,
          y = _ref8.y;
      this.editing = {
        x: x,
        y: y
      };
      var td = this.getCell(x, y);

      var _td$firstChild$getBou = td.firstChild.getBoundingClientRect(),
          width = _td$firstChild$getBou.width,
          height = _td$firstChild$getBou.height;

      this.editingSize = {
        width: width,
        height: height
      };
      td.removeChild(td.firstChild);
      var input = document.createElement('input');
      input.type = 'text';
      input.value = this.getVal(x, y);
      td.appendChild(input);
      input.focus();
      input.addEventListener('blur', this.stopEditing);
      input.addEventListener('keydown', this.blurIfEnter);
    }
  }, {
    key: "destroyEditing",
    value: function destroyEditing() {
      if (this.editing) {
        var _this$editing2 = this.editing,
            x = _this$editing2.x,
            y = _this$editing2.y;
        var input = this.getCell(x, y).firstChild;
        input.removeEventListener('blur', this.stopEditing);
        input.removeEventListener('keydown', this.blurIfEnter);
      }
    }
  }, {
    key: "revertEdit",
    value: function revertEdit() {
      if (!this.editing) return;
      var _this$editing3 = this.editing,
          x = _this$editing3.x,
          y = _this$editing3.y;
      var td = this.getCell(x, y);
      var input = td.firstChild;
      input.value = this.getVal(x, y);
    }
  }, {
    key: "changeSelectedCellsStyle",
    value: function changeSelectedCellsStyle(callback) {
      var oldS = this.selection;
      callback();
      this.selection = this.getSelectionCoords();
      this.forSelectionCoord(oldS, this.restyle);
      this.forSelectionCoord(this.selection, this.restyle);

      if (this.options.onSelectionChange) {
        this.options.onSelectionChange(this.selection);
      }
    }
  }, {
    key: "getSelectionCoords",
    value: function getSelectionCoords() {
      if (!this.selectionStart) return {
        rx: [0, 0],
        ry: [0, 0]
      };
      var rx = [this.selectionStart.x, this.selectionEnd.x];
      if (rx[0] > rx[1]) rx.reverse();
      var ry = [this.selectionStart.y, this.selectionEnd.y];
      if (ry[0] > ry[1]) ry.reverse();
      return {
        rx: [rx[0], rx[1] + 1],
        ry: [ry[0], ry[1] + 1]
      };
    }
  }, {
    key: "forSelectionCoord",
    value: function forSelectionCoord(_ref9, cb) {
      var rx = _ref9.rx,
          ry = _ref9.ry;

      for (var x = rx[0]; x < rx[1]; x++) {
        for (var y = ry[0]; y < ry[1]; y++) {
          if (this.fitBounds({
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
    key: "TDStyle",
    value: function TDStyle(x, y, _ref10) {
      var _this$options;

      var selected = _ref10.selected,
          onlySelected = _ref10.onlySelected,
          editTarget = _ref10.editTarget,
          editing = _ref10.editing;
      return _objectSpread({
        padding: 0,
        background: selected && !editing && !onlySelected ? '#d7f2f9' : '',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: editTarget && !editing ? 'black' : [y ? '#ddd' : 'transparent', 'transparent', 'transparent', x ? '#ddd' : 'transparent'].join(' ')
      }, cleanStyle((_this$options = this.options).cellStyle.apply(_this$options, arguments)));
    }
  }, {
    key: "contentStyle",
    value: function contentStyle(x, y, _ref11) {
      var _this$options2;

      var selected = _ref11.selected,
          onlySelected = _ref11.onlySelected,
          editTarget = _ref11.editTarget,
          editing = _ref11.editing;
      return _objectSpread({
        border: 'none',
        padding: '0 10px',
        minWidth: '100px',
        minHeight: '40px',
        lineHeight: '40px',
        width: editing ? this.editingSize.width + 'px' : '',
        height: editing ? this.editingSize.height + 'px' : '',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        boxSizing: 'border-box'
      }, cleanStyle((_this$options2 = this.options).contentStyle.apply(_this$options2, arguments)));
    }
  }, {
    key: "getCoords",
    value: function getCoords(e) {
      // Returns the clicked cell coords or null
      var node = e.target;

      while (!node.getAttribute('x') && node.parentElement && node.parentElement !== this.parent) {
        node = node.parentElement;
      }

      return {
        x: parseInt(node.getAttribute('x')) || 0,
        y: parseInt(node.getAttribute('y')) || 0
      };
    }
  }, {
    key: "replaceDataWithArray",
    value: function replaceDataWithArray(data) {
      var _this6 = this;

      data.forEach(function (line, y) {
        line.forEach(function (val, x) {
          _this6.setVal(x, y, val);
        });
      });
      this.onDataChanged();
    }
  }, {
    key: "setVal",
    value: function setVal(x, y, val) {
      if (!this.fitBounds({
        x: x,
        y: y
      })) return;
      this.data.setVal(x, y, val);
      this.incrementToFit({
        x: x + 1,
        y: y + 1
      });
      this.refreshDisplayedValue({
        x: x,
        y: y
      });
    }
  }, {
    key: "getVal",
    value: function getVal(x, y) {
      return this.data.getVal(x, y);
    }
  }, {
    key: "getStatus",
    value: function getStatus(x, y) {
      var _this$selection3 = this.selection,
          rx = _this$selection3.rx,
          ry = _this$selection3.ry;
      var selected = x >= rx[0] && x < rx[1] && y >= ry[0] && y < ry[1];
      var editTarget = x === rx[0] && y === ry[0] && rx[0] !== rx[1];
      var editing = this.editing && x === this.editing.x && y === this.editing.y;
      var selectedCount = (rx[1] - rx[0]) * (ry[1] - ry[0]);
      return {
        selected: selected,
        editTarget: editTarget,
        editing: editing,
        onlySelected: selected && selectedCount < 2
      };
    }
  }, {
    key: "getCell",
    value: function getCell(x, y) {
      return this.tbody.children[y].children[x];
    }
  }]);

  return Importabular;
}();

exports.default = Importabular;

var LooseArray = /*#__PURE__*/function () {
  function LooseArray() {
    _classCallCheck(this, LooseArray);

    _defineProperty(this, "data", {});
  }

  _createClass(LooseArray, [{
    key: "setVal",
    value: function setVal(x, y, val) {
      var hash = this.data;
      var cleanedVal = LooseArray.cleanVal(val);

      if (cleanedVal) {
        if (!hash[x]) hash[x] = {};
        hash[x][y] = cleanedVal;
      } else {
        // delete item
        if (hash[x] && hash[x][y]) {
          delete hash[x][y];
          if (LooseArray.isEmpty(hash[x])) delete hash[x];
        }
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.data = {};
    }
  }, {
    key: "getVal",
    value: function getVal(x, y) {
      var hash = this.data;
      return hash && hash[x] && hash[x][y] || '';
    }
  }, {
    key: "toArr",
    value: function toArr() {
      var width = 1,
          height = 1;

      for (var x in this.data) {
        for (var y in this.data[x]) {
          height = Math.max(height, parseInt(y) + 1);
          width = Math.max(width, parseInt(x) + 1);
        }
      }

      var result = [];

      for (var _y = 0; _y < height; _y++) {
        result.push([]);

        for (var _x = 0; _x < width; _x++) {
          result[_y].push(this.getVal(_x, _y));
        }
      }

      return result;
    }
  }], [{
    key: "cleanVal",
    value: function cleanVal(val) {
      if (val === 0) return '0';
      if (!val) return '';
      return val.toString();
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
  }]);

  return LooseArray;
}();

function arrToHTML(arr) {
  var table = document.createElement('table');
  arr.forEach(function (row) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    row.forEach(function (cell) {
      var td = document.createElement('td');
      tr.appendChild(td);
      td.innerText = cell;
    });
  });
  return table.outerHTML;
}

function parsePasteEvent(event) {
  try {
    var html = (event.clipboardData || window.clipboardData).getData('text/html');
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    var trs = iframe.contentWindow.document.querySelectorAll('tr');
    var data = [];
    Array.prototype.forEach.call(trs, function (tr, y) {
      var tds = tr.querySelectorAll('td');
      Array.prototype.forEach.call(tds, function (td, x) {
        var text = td.innerText;
        if (!data[y]) data[y] = [];
        data[y][x] = text;
      });
    });
    document.body.removeChild(iframe);
    if (data.length) return ensureDimensions(data);
  } catch (e) {}

  var fromText = (event.clipboardData || window.clipboardData).getData('text').split(/\r\n|\n|\r/).map(function (row) {
    return row.split('\t');
  });
  return ensureDimensions(fromText);
}

function ensureDimensions(rows) {
  if (!rows || !rows.length || !rows[0].length) return [];
  var width = rows[0].length;
  var height = rows.length;
  var result = [];

  for (var y = 0; y < height; y++) {
    result.push([]);

    for (var x = 0; x < width; x++) {
      var val = rows[y][x] || '';
      result[y].push(val);
    }
  }

  return result;
}

function cleanStyle(s) {
  if (!s) return {};
  Object.keys(s).forEach(function (key) {
    return !s[key] && s[key] !== 0 && delete s[key];
  });
  return s;
}
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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

var _src = _interopRequireDefault(require("../src"));

require("./demo.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _src.default({
  data: [['Product ID', 'Product name', 'Price', 'Unit', 'Category'], ['256', 'Sample product', '2.5', 'Piece', 'Stuffs'], ['122', 'Pre mix drink', '5', 'Bottle', 'Drinks']],
  node: document.getElementById('editorNode'),
  maxWidth: 5,
  minHeight: 8
});
},{"../src":"../src/index.js","./demo.css":"demo.css"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41601" + '/');

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