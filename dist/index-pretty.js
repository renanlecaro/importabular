!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.Importabular = e())
    : (t.Importabular = e());
})(self, function () {
  return (() => {
    "use strict";
    var t = {
        895: (t, e, i) => {
          i.d(e, { default: () => l });
          class s {
            constructor() {
              var t, e;
              (e = {}),
                (t = "_data") in this
                  ? Object.defineProperty(this, t, {
                      value: e,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (this[t] = e);
            }
            _setVal(t, e, i) {
              const s = this._data,
                n = (function (t) {
                  return 0 === t ? "0" : t ? t.toString() : "";
                })(i);
              var o;
              n
                ? (s[t] || (s[t] = {}), (s[t][e] = n))
                : s[t] &&
                  s[t][e] &&
                  (delete s[t][e],
                  (o = s[t]),
                  0 === Object.keys(o).length && delete s[t]);
            }
            _clear() {
              this._data = {};
            }
            _getVal(t, e) {
              const i = this._data;
              return (i && i[t] && i[t][e]) || "";
            }
            _toArr() {
              let t = 1,
                e = 1;
              for (let i in this._data)
                for (let s in this._data[i])
                  (e = Math.max(e, parseInt(s) + 1)),
                    (t = Math.max(t, parseInt(i) + 1));
              const i = [];
              for (let s = 0; s < e; s++) {
                i.push([]);
                for (let e = 0; e < t; e++) i[s].push(this._getVal(e, s));
              }
              return i;
            }
          }
          function n(t, e, i, s, n, o, r) {
            if ((t += i) < s) {
              if (n === 1 / 0) return { x: s, y: e };
              if (((t = n), --e < o)) {
                if (r === 1 / 0) return { x: s, y: o };
                e = r;
              }
            }
            return (
              t > n && ((t = s), ++e > r && ((e = o), (t = s))), { x: t, y: e }
            );
          }
          function o(t, e, i) {
            return (
              e in t
                ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[e] = i),
              t
            );
          }
          const r = [
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
          class l {
            constructor(t) {
              o(this, "_width", 1),
                o(this, "_height", 1),
                o(this, "_data", new s()),
                o(this, "paste", (t) => {
                  if (this._editing) return;
                  t.preventDefault();
                  const e = (function (t) {
                      try {
                        const e = (
                            t.clipboardData || window.clipboardData
                          ).getData("text/html"),
                          i = document.createElement("iframe");
                        document.body.appendChild(i),
                          i.contentWindow.document.open(),
                          i.contentWindow.document.write(e),
                          i.contentWindow.document.close();
                        const s = i.contentWindow.document.querySelectorAll(
                            "tr"
                          ),
                          n = [];
                        if (
                          (Array.prototype.forEach.call(s, (t, e) => {
                            const i = t.querySelectorAll("td");
                            Array.prototype.forEach.call(i, (t, i) => {
                              const s = t.textContent;
                              n[e] || (n[e] = []), (n[e][i] = s);
                            });
                          }),
                          document.body.removeChild(i),
                          n.length)
                        )
                          return n;
                      } catch (t) {}
                      return (t.clipboardData || window.clipboardData)
                        .getData("text")
                        .split(/\r\n|\n|\r/)
                        .map((t) => t.split(""));
                    })(t),
                    { rx: i, ry: s } = this._selection,
                    n = { x: i[0], y: s[0] };
                  for (let t = 0; t < e.length; t++)
                    for (let i = 0; i < e[0].length; i++)
                      this._setVal(n.x + i, n.y + t, e[t][i]);
                  this._changeSelectedCellsStyle(() => {
                    (this._selectionStart = n),
                      (this._selectionEnd = {
                        x: n.x + e[0].length - 1,
                        y: n.y + e.length - 1,
                      }),
                      this._onDataChanged();
                  });
                }),
                o(this, "copy", (t) => {
                  if (this._editing) return;
                  const e = this._getSelectionAsArray();
                  e &&
                    (t.preventDefault(),
                    t.clipboardData.setData(
                      "text/html",
                      (function (t) {
                        const e = document.createElement("table");
                        return (
                          e.setAttribute("lang", navigator.language),
                          t.forEach((t) => {
                            const i = document.createElement("tr");
                            e.appendChild(i),
                              t.forEach((t) => {
                                const e = document.createElement("td");
                                i.appendChild(e), (e.textContent = t);
                              });
                          }),
                          `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html lang="${navigator.language}"><head>\n<meta http-equiv="content-type" content="text/html; charset=utf-8"/><title></title></head><body>${e.outerHTML}</body></html>`
                        );
                      })(e)
                    ),
                    t.clipboardData.setData(
                      "text/plain",
                      e.map((t) => t.join("")).join("\n")
                    ));
                }),
                o(this, "cut", (t) => {
                  this._editing ||
                    (this.copy(t), this._setAllSelectedCellsTo(""));
                }),
                o(this, "keydown", (t) => {
                  t.ctrlKey ||
                    (this._selectionStart &&
                      ("Escape" === t.key &&
                        this._editing &&
                        (t.preventDefault(),
                        this._revertEdit(),
                        this._stopEditing()),
                      "Enter" === t.key &&
                        (t.preventDefault(),
                        this._tabCursorInSelection(!1, t.shiftKey ? -1 : 1)),
                      "Tab" === t.key &&
                        (t.preventDefault(),
                        this._tabCursorInSelection(!0, t.shiftKey ? -1 : 1)),
                      this._editing ||
                        ("F2" === t.key &&
                          (t.preventDefault(), this._startEditing(this._focus)),
                        ("Delete" !== t.key && "Backspace" !== t.key) ||
                          (t.preventDefault(), this._setAllSelectedCellsTo("")),
                        "ArrowDown" === t.key &&
                          (t.preventDefault(),
                          this._moveCursor({ y: 1 }, t.shiftKey)),
                        "ArrowUp" === t.key &&
                          (t.preventDefault(),
                          this._moveCursor({ y: -1 }, t.shiftKey)),
                        "ArrowLeft" === t.key &&
                          (t.preventDefault(),
                          this._moveCursor({ x: -1 }, t.shiftKey)),
                        "ArrowRight" === t.key &&
                          (t.preventDefault(),
                          this._moveCursor({ x: 1 }, t.shiftKey))),
                      1 !== t.key.length ||
                        this._editing ||
                        this._changeSelectedCellsStyle(() => {
                          const { x: t, y: e } = this._focus;
                          this._startEditing({ x: t, y: e }),
                            (this._getCell(t, e).firstChild.value = "");
                        })));
                }),
                o(this, "_selecting", !1),
                o(this, "_selectionStart", null),
                o(this, "_selectionEnd", null),
                o(this, "_selection", { rx: [0, 0], ry: [0, 0] }),
                o(this, "_editing", null),
                o(this, "_focus", null),
                o(this, "mousedown", (t) => {
                  if (!this.mobile) {
                    if (
                      3 === t.which &&
                      !this._editing &&
                      this._selectionSize()
                    ) {
                      let t = new Range();
                      const { rx: e, ry: i } = this._selection;
                      return (
                        t.setStart(this._getCell(e[0], i[0]), 0),
                        t.setEnd(this._getCell(e[0], i[0]), 1),
                        this.cwd.getSelection().removeAllRanges(),
                        void this.cwd.getSelection().addRange(t)
                      );
                    }
                    this._changeSelectedCellsStyle(() => {
                      (this.tbody.style.userSelect = "none"),
                        (this._selectionEnd = this._selectionStart = this._focus = this._getCoords(
                          t
                        )),
                        (this._selecting = !0);
                    });
                  }
                }),
                o(this, "mouseenter", (t) => {
                  this.mobile ||
                    (this._selecting &&
                      this._changeSelectedCellsStyle(() => {
                        this._selectionEnd = this._getCoords(t);
                      }));
                }),
                o(this, "_lastMouseUp", null),
                o(this, "_lastMouseUpTarget", null),
                o(this, "mouseup", (t) => {
                  this.mobile ||
                    (3 !== t.which &&
                      this._selecting &&
                      this._changeSelectedCellsStyle(() => {
                        (this._selectionEnd = this._getCoords(t)),
                          this._endSelection(),
                          this._lastMouseUp &&
                            this._lastMouseUp > Date.now() - 300 &&
                            this._lastMouseUpTarget.x ===
                              this._selectionEnd.x &&
                            this._lastMouseUpTarget.y ===
                              this._selectionEnd.y &&
                            this._startEditing(this._selectionEnd),
                          (this._lastMouseUp = Date.now()),
                          (this._lastMouseUpTarget = this._selectionEnd);
                      }));
                }),
                o(this, "mouseleave", (t) => {
                  t.target === this.tbody &&
                    this._selecting &&
                    this._endSelection();
                }),
                o(this, "touchstart", (t) => {
                  this._editing || ((this.mobile = !0), (this.moved = !1));
                }),
                o(this, "touchend", (t) => {
                  this.mobile &&
                    (this._editing ||
                      this.moved ||
                      (this._changeSelectedCellsStyle(() => {
                        this._selectionEnd = this._selectionStart = this._focus = this._getCoords(
                          t
                        );
                      }),
                      this._startEditing(this._focus)));
                }),
                o(this, "touchmove", (t) => {
                  this.mobile && (this.moved = !0);
                }),
                o(this, "_stopEditing", () => {
                  if (!this._editing) return;
                  const { x: t, y: e } = this._editing,
                    i = this._getCell(t, e);
                  (i.style.width = ""), (i.style.height = "");
                  const s = i.firstChild;
                  s.removeEventListener("blur", this._stopEditing),
                    s.removeEventListener("keydown", this._blurIfEnter),
                    this._setVal(t, e, s.value),
                    this._onDataChanged(),
                    i.removeChild(s),
                    (this._editing = null),
                    this._renderTDContent(i, t, e);
                }),
                o(this, "_blurIfEnter", (t) => {
                  13 === t.keyCode && (this._stopEditing(), t.preventDefault());
                }),
                o(this, "_restyle", ({ x: t, y: e }) => {
                  this._getCell(t, e).className = this._classNames(t, e);
                }),
                o(this, "_refreshDisplayedValue", ({ x: t, y: e }) => {
                  const i = this._getCell(t, e).firstChild;
                  "DIV" === i.tagName &&
                    (i.textContent = this._divContent(t, e)),
                    this._restyle({ x: t, y: e });
                }),
                this._saveConstructorOptions(t),
                this._setupDom(),
                this._replaceDataWithArray(t.data),
                this._incrementToFit({
                  x: this.columns.length - 1,
                  y: this._options.minRows - 1,
                }),
                this._fillScrollSpace();
            }
            _runChecks(t) {
              const { titles: e, classNames: i } = this.checks(t);
              this.checkResults = { titles: e, classNames: i };
            }
            _saveConstructorOptions({
              data: t = [],
              node: e = null,
              onChange: i = null,
              minRows: s = 1,
              maxRows: n = 1 / 0,
              css: o = "",
              width: r = "100%",
              height: l = "80vh",
              columns: h,
              checks: a,
            }) {
              if (
                ((this.columns = h),
                (this.checks = a || (() => ({}))),
                this._runChecks(t),
                !e)
              )
                throw new Error(
                  "You need to pass a node argument to Importabular, like this : new Importabular({node: document.body})"
                );
              (this._parent = e),
                (this._options = {
                  onChange: i,
                  minRows: s,
                  maxRows: n,
                  css:
                    "\nhtml{\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n::-webkit-scrollbar {\n  width: 0;\n  height:0;\n}\n*{\n  box-sizing: border-box;\n}\nbody{\n  padding: 0; \n  margin: 0;\n}\ntable{\n  border-spacing: 0;\n  background: white;\n  border: 1px solid #ddd;\n  border-width: 0 1px 1px 0;\n  font-size: 16px;\n  font-family: sans-serif;\n  border-collapse: separate;\n  min-width:100%;\n}\ntd, th{\n  padding:0;\n  border: 1px solid;\n  border-color: #ddd transparent transparent #ddd; \n}\ntd.selected.multi:not(.editing){\n  background:#d7f2f9;\n} \ntd.focus:not(.editing){\n  border-color: black;\n} \ntd>*, th>*{\n  border:none;\n  padding:10px;\n  min-width:100px;\n  min-height: 40px;\n  font:inherit;\n  line-height: 20px;\n  color:inherit;\n  white-space: normal;\n}\ntd>div::selection {\n    color: none;\n    background: none;\n}\n\n.placeholder div{\n  user-select:none;\n  color:rgba(0,0,0,0.2);\n}\n*[title] div{cursor:help;}\nth{text-align:left;}\n" +
                    o,
                }),
                (this._iframeStyle = {
                  width: r,
                  height: l,
                  border: "none",
                  background: "transparent",
                });
            }
            _fitBounds({ x: t, y: e }) {
              return (
                t >= 0 &&
                t < this.columns.length &&
                e >= 0 &&
                e < this._options.maxRows
              );
            }
            _fillScrollSpace() {
              const t = Math.ceil(this.iframe.contentWindow.innerHeight / 40),
                e = Math.ceil(this.iframe.contentWindow.innerWidth / 100);
              this._incrementToFit({ x: e - 1, y: t - 1 });
            }
            _onDataChanged() {
              this._options.onChange &&
                this._options.onChange(this._data._toArr()),
                this._runChecks(this._data._toArr());
            }
            _renderTDContent(t, e, i) {
              const s = document.createElement("div");
              t.setAttribute("x", e.toString()),
                t.setAttribute("y", i.toString());
              const n = this._divContent(e, i);
              n ? (s.textContent = n) : (s.innerHTML = "&nbsp;"),
                t.appendChild(s),
                this._restyle({ x: e, y: i });
              const o = h(this.checkResults.titles, e, i);
              o ? t.setAttribute("title", o) : t.removeAttribute("title");
            }
            _divContent(t, e) {
              return this._getVal(t, e) || this.columns[t].placeholder;
            }
            _setupDom() {
              const t = document.createElement("iframe");
              (this.iframe = t), this._parent.appendChild(t);
              const e = t.contentWindow.document;
              (this.cwd = e),
                e.open(),
                e.write(
                  `<html lang="${navigator.language}"><body><style>${this._options.css}</style></body></html>`
                ),
                e.close(),
                Object.assign(t.style, this._iframeStyle);
              const i = document.createElement("table"),
                s = document.createElement("tbody"),
                n = document.createElement("THEAD"),
                o = document.createElement("TR");
              n.appendChild(o),
                this.columns.forEach((t) => {
                  const e = document.createElement("TH"),
                    i = document.createElement("div");
                  (i.innerHTML = t.label),
                    t.title && e.setAttribute("title", t.title),
                    e.appendChild(i),
                    o.appendChild(e);
                }),
                i.appendChild(n),
                i.appendChild(s),
                e.body.appendChild(i),
                (this.tbody = s),
                (this.table = i);
              for (let t = 0; t < this._height; t++) {
                const e = document.createElement("tr");
                s.appendChild(e);
                for (let i = 0; i < this._width; i++) this._addCell(e, i, t);
              }
              r.forEach((t) => e.addEventListener(t, this[t], !0));
            }
            destroy() {
              this._destroyEditing(),
                r.forEach((t) => this.cwd.removeEventListener(t, this[t], !0)),
                this.iframe.parentElement.removeChild(this.iframe);
            }
            _addCell(t, e, i) {
              const s = document.createElement("td");
              t.appendChild(s), this._renderTDContent(s, e, i);
            }
            _incrementHeight() {
              if (!this._fitBounds({ x: 0, y: this._height })) return !1;
              this._height++;
              const t = this._height - 1,
                e = document.createElement("tr");
              this.tbody.appendChild(e);
              for (let i = 0; i < this._width; i++) this._addCell(e, i, t);
              return !0;
            }
            _incrementWidth() {
              if (!this._fitBounds({ x: this._width, y: 0 })) return !1;
              this._width++;
              const t = this._width - 1;
              return (
                Array.prototype.forEach.call(this.tbody.children, (e, i) => {
                  this._addCell(e, t, i);
                }),
                !0
              );
            }
            _incrementToFit({ x: t, y: e }) {
              for (; t > this._width - 1 && this._incrementWidth(); );
              for (; e > this._height - 1 && this._incrementHeight(); );
            }
            _getSelectionAsArray() {
              const { rx: t, ry: e } = this._selection;
              if (t[0] === t[1]) return null;
              const i = t[1] - t[0],
                s = e[1] - e[0],
                n = [];
              for (let o = 0; o < s; o++) {
                n.push([]);
                for (let s = 0; s < i; s++)
                  n[o].push(this._getVal(t[0] + s, e[0] + o));
              }
              return n;
            }
            _setAllSelectedCellsTo(t) {
              this._forSelectionCoord(this._selection, ({ x: e, y: i }) =>
                this._setVal(e, i, t)
              ),
                this._onDataChanged(),
                this._forSelectionCoord(
                  this._selection,
                  this._refreshDisplayedValue
                );
            }
            _moveCursor({ x: t = 0, y: e = 0 }, i) {
              const s = i ? this._selectionEnd : this._selectionStart,
                n = { x: s.x + t, y: s.y + e };
              this._fitBounds(n) &&
                (this._stopEditing(),
                this._incrementToFit(n),
                this._changeSelectedCellsStyle(() => {
                  i
                    ? (this._selectionEnd = n)
                    : (this._selectionStart = this._selectionEnd = this._focus = n);
                }),
                this._scrollIntoView(n));
            }
            _tabCursorInSelection(t, e = 1) {
              let { x: i, y: s } = this._focus || { x: 0, y: 0 };
              const o = this._selectionSize(),
                { rx: r, ry: l } =
                  o > 1
                    ? this._selection
                    : {
                        rx: [0, this.columns.length],
                        ry: [0, this._options.maxRows],
                      };
              let h;
              if (t) h = n(i, s, e, r[0], r[1] - 1, l[0], l[1] - 1);
              else {
                const t = n(s, i, e, l[0], l[1] - 1, r[0], r[1] - 1);
                h = { x: t.y, y: t.x };
              }
              this._fitBounds(h) &&
                (this._stopEditing(),
                this._incrementToFit(h),
                this._changeSelectedCellsStyle(() => {
                  (this._focus = h),
                    o <= 1 && (this._selectionStart = this._selectionEnd = h);
                }),
                this._scrollIntoView(h));
            }
            _scrollIntoView({ x: t, y: e }) {
              this._getCell(t, e).scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }
            _endSelection() {
              (this._selecting = !1), (this.tbody.style.userSelect = "");
            }
            _startEditing({ x: t, y: e }) {
              this._editing = { x: t, y: e };
              const i = this._getCell(t, e),
                s = i.getBoundingClientRect(),
                n = i.firstChild.getBoundingClientRect();
              i.removeChild(i.firstChild);
              const o = document.createElement("input");
              (o.type = "text"),
                (o.value = this._getVal(t, e)),
                i.appendChild(o),
                Object.assign(i.style, {
                  width: s.width - 2,
                  height: s.height,
                }),
                Object.assign(o.style, {
                  width: `${n.width}px`,
                  height: `${n.height}px`,
                }),
                o.focus(),
                o.addEventListener("blur", this._stopEditing),
                o.addEventListener("keydown", this._blurIfEnter);
            }
            _destroyEditing() {
              if (this._editing) {
                const { x: t, y: e } = this._editing,
                  i = this._getCell(t, e).firstChild;
                i.removeEventListener("blur", this._stopEditing),
                  i.removeEventListener("keydown", this._blurIfEnter);
              }
            }
            _revertEdit() {
              if (!this._editing) return;
              const { x: t, y: e } = this._editing;
              this._getCell(t, e).firstChild.value = this._getVal(t, e);
            }
            _changeSelectedCellsStyle(t) {
              const e = this._selection;
              t(),
                (this._selection = this._getSelectionCoords()),
                this._forSelectionCoord(e, this._restyle),
                this._forSelectionCoord(this._selection, this._restyle);
            }
            _getSelectionCoords() {
              if (!this._selectionStart) return { rx: [0, 0], ry: [0, 0] };
              let t = [this._selectionStart.x, this._selectionEnd.x];
              t[0] > t[1] && t.reverse();
              let e = [this._selectionStart.y, this._selectionEnd.y];
              return (
                e[0] > e[1] && e.reverse(),
                { rx: [t[0], t[1] + 1], ry: [e[0], e[1] + 1] }
              );
            }
            _forSelectionCoord({ rx: t, ry: e }, i) {
              for (let s = t[0]; s < t[1]; s++)
                for (let t = e[0]; t < e[1]; t++)
                  this._fitBounds({ x: s, y: t }) && i({ x: s, y: t });
            }
            _selectionSize() {
              const { rx: t, ry: e } = this._selection;
              return (t[1] - t[0]) * (e[1] - e[0]);
            }
            _classNames(t, e) {
              const { rx: i, ry: s } = this._selection;
              let n = "";
              return (
                t >= i[0] &&
                  t < i[1] &&
                  e >= s[0] &&
                  e < s[1] &&
                  ((n += " selected"),
                  this._selectionSize() > 1 && (n += " multi")),
                this._focus &&
                  this._focus.x === t &&
                  this._focus.y === e &&
                  (n += " focus"),
                this._editing &&
                  t === this._editing.x &&
                  e === this._editing.y &&
                  (n += " editing"),
                this._getVal(t, e) || (n += " placeholder"),
                (n += " " + h(this.checkResults.classNames, t, e)),
                n
              );
            }
            _getCoords(t) {
              let e = t.target;
              for (; !e.getAttribute("x") && e.parentElement; )
                e = e.parentElement;
              return {
                x: parseInt(e.getAttribute("x")) || 0,
                y: parseInt(e.getAttribute("y")) || 0,
              };
            }
            setData(t) {
              this._data._clear(), this._replaceDataWithArray(t);
              for (let t = 0; t < this._width; t++)
                for (let e = 0; e < this._height; e++)
                  this._refreshDisplayedValue({ x: t, y: e });
            }
            getData() {
              return this._data._toArr();
            }
            _replaceDataWithArray(t = [[]]) {
              t.forEach((t, e) => {
                t.forEach((t, i) => {
                  this._setVal(i, e, t);
                });
              });
            }
            _setVal(t, e, i) {
              this._fitBounds({ x: t, y: e }) &&
                (this._data._setVal(t, e, i),
                this._incrementToFit({ x: t + 1, y: e + 1 }),
                this._refreshDisplayedValue({ x: t, y: e }));
            }
            _getVal(t, e) {
              return this._data._getVal(t, e);
            }
            _getCell(t, e) {
              return this.tbody.children[e].children[t];
            }
          }
          function h(t, e, i) {
            return (t && t[i] && t[i][e]) || "";
          }
        },
      },
      e = {};
    function i(s) {
      if (e[s]) return e[s].exports;
      var n = (e[s] = { exports: {} });
      return t[s](n, n.exports, i), n.exports;
    }
    return (
      (i.d = (t, e) => {
        for (var s in e)
          i.o(e, s) &&
            !i.o(t, s) &&
            Object.defineProperty(t, s, { enumerable: !0, get: e[s] });
      }),
      (i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      i(895)
    );
  })().default;
});