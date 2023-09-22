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
        103: (t, e, i) => {
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
            _toArr(t, e) {
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
          function o(t) {
            return t.split('"').length - 1;
          }
          function r(t, e, i) {
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
          const h = [
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
              r(this, "_width", 1),
                r(this, "_height", 1),
                r(this, "_data", new s()),
                r(this, "paste", (t) => {
                  if (this._editing) return;
                  t.preventDefault();
                  const e = (function (t) {
                      var e,
                        i,
                        s,
                        n,
                        r,
                        h,
                        l,
                        a = [],
                        d = 0;
                      for (
                        (s = t.split("\n")).length > 1 &&
                          "" === s[s.length - 1] &&
                          s.pop(),
                          e = 0,
                          i = s.length;
                        e < i;
                        e += 1
                      ) {
                        for (
                          s[e] = s[e].split("\t"), n = 0, r = s[e].length;
                          n < r;
                          n += 1
                        )
                          a[d] || (a[d] = []),
                            h && 0 === n
                              ? ((l = a[d].length - 1),
                                (a[d][l] = a[d][l] + "\n" + s[e][0]),
                                h &&
                                  1 & o(s[e][0]) &&
                                  ((h = !1),
                                  (a[d][l] = a[d][l]
                                    .substring(0, a[d][l].length - 1)
                                    .replace(/""/g, '"'))))
                              : n === r - 1 &&
                                0 === s[e][n].indexOf('"') &&
                                1 & o(s[e][n])
                              ? (a[d].push(
                                  s[e][n].substring(1).replace(/""/g, '"')
                                ),
                                (h = !0))
                              : (a[d].push(s[e][n].replace(/""/g, '"')),
                                (h = !1));
                        h || (d += 1);
                      }
                      return a;
                    })(
                      (t.clipboardData || window.clipboardData).getData(
                        "text/plain"
                      )
                    ),
                    { rx: i, ry: s } = this._selection,
                    n = { x: i[0], y: s[0] };
                  for (let t = 0; t < e.length; t++)
                    for (let i = 0; i < e[0].length; i++)
                      this._noEditFlag(n.x + i, n.y + t) ||
                        (i === e[0].length - 1 &&
                          /\r?\n|\r/.test(e[t][i]) &&
                          '"' === e[t][i].slice(-1) &&
                          (e[t][i] = e[t][i].slice(0, -1)),
                        this._setVal(
                          n.x + i,
                          n.y + t,
                          e[t][i].replace(/\r?\n|\r/g, "")
                        ));
                  this._changeSelectedCellsStyle(() => {
                    (this._selectionStart = n),
                      (this._selectionEnd = {
                        x: n.x + e[0].length - 1,
                        y: n.y + e.length - 1,
                      }),
                      this._onDataChanged();
                  });
                }),
                r(this, "copy", (t) => {
                  if (this._editing) return;
                  const e = this._getSelectionAsArray();
                  e &&
                    (t.preventDefault(),
                    t.clipboardData.setData(
                      "text/plain",
                      (function (t) {
                        var e,
                          i,
                          s,
                          n,
                          o,
                          r = "";
                        for (e = 0, i = t.length; e < i; e += 1) {
                          for (s = 0, n = t[e].length; s < n; s += 1)
                            s > 0 && (r += "\t"),
                              "string" == typeof (o = t[e][s])
                                ? o.indexOf("\n") > -1
                                  ? (r += '"' + o.replace(/"/g, '""') + '"')
                                  : (r += o)
                                : (r += null == o ? "" : o);
                          r += "\n";
                        }
                        return r;
                      })(e)
                    ));
                }),
                r(this, "cut", (t) => {
                  this._editing ||
                    (this.copy(t), this._setAllSelectedCellsTo(""));
                }),
                r(this, "keydown", (t) => {
                  if (t.ctrlKey)
                    this._editing &&
                      (t.preventDefault(),
                      this._revertEdit(),
                      this._stopEditing());
                  else if (
                    ("KeyA" != t.code ||
                      this._editing ||
                      (t.preventDefault(),
                      this._startEditing(this._focus),
                      this.keydown(t)),
                    this._selectionStart)
                  ) {
                    "Escape" === t.key &&
                      this._editing &&
                      (t.preventDefault(),
                      this._revertEdit(),
                      this._stopEditing()),
                      "Enter" === t.key &&
                        (t.preventDefault(),
                        this._tabCursorInSelection(!1, t.shiftKey ? -1 : 1),
                        this._startEditing(this._focus)),
                      "Tab" === t.key &&
                        (t.preventDefault(),
                        this._tabCursorInSelection(!0, t.shiftKey ? -1 : 1)),
                      this._editing ||
                        ("F2" === t.key &&
                          (t.preventDefault(), this._startEditing(this._focus)),
                        ("Delete" !== t.key && "Backspace" !== t.key) ||
                          (t.preventDefault(),
                          this._setAllSelectedCellsTo("")));
                    let e = !1;
                    "ArrowDown" === t.key &&
                      (t.preventDefault(),
                      this._moveCursor({ y: 1 }, t.shiftKey),
                      this._startEditing(this._focus),
                      (e = !0)),
                      "ArrowUp" === t.key &&
                        (t.preventDefault(),
                        this._moveCursor({ y: -1 }, t.shiftKey),
                        this._startEditing(this._focus),
                        (e = !0)),
                      "ArrowLeft" === t.key &&
                        (t.preventDefault(),
                        this._moveCursor({ x: -1 }, t.shiftKey),
                        this._startEditing(this._focus),
                        (e = !0)),
                      "ArrowRight" === t.key &&
                        (t.preventDefault(),
                        this._moveCursor({ x: 1 }, t.shiftKey),
                        this._startEditing(this._focus),
                        (e = !0)),
                      t.shiftKey &&
                        e &&
                        (t.preventDefault(), this._stopEditing());
                  }
                }),
                r(this, "_selecting", !1),
                r(this, "_selectionStart", null),
                r(this, "_selectionEnd", null),
                r(this, "_selection", { rx: [0, 0], ry: [0, 0] }),
                r(this, "_editing", null),
                r(this, "_focus", null),
                r(this, "_option_pos", {}),
                r(this, "mousedown", (t) => {
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
                    !this._editing ||
                      (this._getCoords(t).x === this._editing.x &&
                        this._getCoords(t).y === this._editing.y) ||
                      this._stopEditing(),
                      this._changeSelectedCellsStyle(() => {
                        this._isValidCoords(t) &&
                          ((this.tbody.style.userSelect = "none"),
                          (this._selectionEnd = this._selectionStart = this._focus = this._getCoords(
                            t
                          )),
                          (this._selecting = !0),
                          this._startEditing(this._focus));
                      });
                  }
                }),
                r(this, "mouseenter", (t) => {
                  this.mobile;
                }),
                r(this, "_lastMouseUp", null),
                r(this, "_lastMouseUpTarget", null),
                r(this, "mouseup", (t) => {
                  this.mobile ||
                    (3 !== t.which &&
                      this._selecting &&
                      this._changeSelectedCellsStyle(() => {
                        (this._selectionEnd = this._getCoords(t)),
                          this._endSelection(),
                          this._startEditing(this._focus, !0),
                          this._lastMouseUp &&
                            this._lastMouseUp > Date.now() - 300 &&
                            this._lastMouseUpTarget.x ===
                              this._selectionEnd.x &&
                            this._lastMouseUpTarget.y ===
                              this._selectionEnd.y &&
                            this._startEditing(this._selectionEnd, !0),
                          (this._lastMouseUp = Date.now()),
                          (this._lastMouseUpTarget = this._selectionEnd);
                      }));
                }),
                r(this, "mouseleave", (t) => {
                  t.target === this.tbody &&
                    this._selecting &&
                    this._endSelection();
                }),
                r(this, "touchstart", (t) => {
                  this._editing || ((this.mobile = !0), (this.moved = !1));
                }),
                r(this, "touchend", (t) => {
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
                r(this, "touchmove", (t) => {
                  this.mobile && (this.moved = !0);
                }),
                r(this, "_stopEditing", () => {
                  if (!this._editing) return;
                  this._option_pos && (this._option_pos = {});
                  const { x: t, y: e } = this._editing;
                  if (this._noEditFlag(t, e) || this._btnRowDelFlag(t)) return;
                  const i = this._getCell(t, e);
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
                r(this, "_blurIfEnter", (t) => {
                  13 === t.keyCode && (this._stopEditing(), t.preventDefault());
                }),
                r(this, "_cancelKeyOnSelect", (t) => {
                  const e = t.keyCode;
                  (13 !== e && 33 !== e && 34 != e && 36 !== e && 35 !== e) ||
                    (this._stopEditing(), t.preventDefault());
                }),
                r(this, "_selectChange", (t) => {
                  this._stopEditing();
                }),
                r(this, "_restyle", ({ x: t, y: e }) => {
                  const i = this._getCell(t, e);
                  i.className = this._classNames(t, e);
                  const s = a(this.checkResults.titles, t, e);
                  s ? i.setAttribute("title", s) : i.removeAttribute("title");
                }),
                r(this, "_refreshDisplayedValue", ({ x: t, y: e }) => {
                  const i = this._getCell(t, e).firstChild;
                  i &&
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
              height: h = "80vh",
              columns: l,
              checks: a,
              select: d = [],
              bond: c = [],
              noEdit: _ = [[], []],
              styleChg: u = null,
              btnRowDel: g = null,
            }) {
              if (
                ((this.columns = l),
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
                    "\nhtml{\n  overflow: auto;\n}\n*{\n  box-sizing: border-box;\n}\niframe{\n  position:absolute;\n}\nbody{\n  padding: 0; \n  margin: 0;\n}\ntable{\n  border-spacing: 0;\n  background: white;\n  border: 1px solid #ddd;\n  border-width: 0 1px 1px 0;\n  font-size: 16px;\n  font-family: sans-serif;\n  border-collapse: separate;\n  min-width:100%;\n}\ntd, th{\n  padding:0;\n  border: 1px solid;\n  border-color: #ddd transparent transparent #ddd; \n}\ntd.selected.multi:not(.editing){\n  background:#d7f2f9;\n} \ntd.focus:not(.editing){\n  border-color: #13ac59;\n} \ntd>*, th>*{\n  border:none;\n  padding:10px;\n  min-width:10px;\n  min-height: 40px;\n  font:inherit;\n  line-height: 20px;\n  color:inherit;\n  white-space: normal;\n}\ntd>div::selection {\n    color: none;\n    background: none;\n}\n\n.placeholder div{\n  user-select:none;\n  color:rgba(0,0,0,0.2);\n}\n*[title] div{cursor:help;}\nth{text-align:left;}\n" +
                    o,
                  select: d,
                  bond: c,
                  noEdit: _,
                  styleChg: u,
                  btnRowDel: g,
                }),
                (this._iframeStyle = {
                  width: r,
                  height: h,
                  border: "none",
                  position: "absolute",
                  background: "transparent",
                  borderRadius: "5px",
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
            getData() {
              return this._data._toArr(this._width, this._height);
            }
            getColor() {
              return this._toArrColorFlag(this._width, this._height);
            }
            _onDataChanged() {
              const t = this.getData();
              this._options.onChange && this._options.onChange(t),
                this._runChecks(t),
                this._restyleAll();
            }
            _renderTDContent(t, e, i) {
              if (this._btnRowDelFlag(e)) return;
              var s = document.createElement("div");
              t.setAttribute("x", e.toString()),
                t.setAttribute("y", i.toString()),
                t.setAttribute("id", e.toString() + i.toString());
              const n = this._divContent(e, i);
              n ? (s.textContent = n) : (s.innerHTML = "&nbsp;"),
                t.appendChild(s),
                this._restyle({ x: e, y: i });
            }
            _divContent(t, e) {
              return this._getVal(t, e) || this.columns[t].placeholder;
            }
            _selsectContent(t, e) {
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
                o = document.createElement("TR"),
                r = document.createElement("TR"),
                l = [];
              this._options.bond.length > 0
                ? (n.appendChild(r),
                  n.appendChild(o),
                  this.columns.forEach((t, e) => {
                    const i = document.createElement("TH"),
                      s = document.createElement("div");
                    let n = !1;
                    for (const o of this._options.bond)
                      if (e >= o.startRow && e < o.startRow + o.rowSize) {
                        e === o.startRow &&
                          ((s.innerHTML = o.label),
                          o.label && i.appendChild(s),
                          i.setAttribute("colspan", o.rowSize),
                          r.appendChild(i)),
                          l.push(t),
                          (n = !0);
                        break;
                      }
                    n ||
                      ((s.innerHTML = t.label),
                      t.title && i.setAttribute("title", t.title),
                      i.appendChild(s),
                      r.appendChild(i),
                      i.setAttribute("rowspan", "2"));
                  }),
                  l.forEach((t) => {
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
                  (this.table = i))
                : (n.appendChild(r),
                  this.columns.forEach((t) => {
                    const e = document.createElement("TH"),
                      i = document.createElement("div");
                    (i.innerHTML = t.label),
                      t.title && e.setAttribute("title", t.title),
                      e.appendChild(i),
                      r.appendChild(e);
                  })),
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
              h.forEach((t) => e.addEventListener(t, this[t], !0));
            }
            destroy() {
              this._destroyEditing(),
                h.forEach((t) => this.cwd.removeEventListener(t, this[t], !0)),
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
              this._forSelectionCoord(this._selection, ({ x: e, y: i }) => {
                this._noEditFlag(e, i) || this._setVal(e, i, t);
              }),
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
                { rx: r, ry: h } =
                  o > 1
                    ? this._selection
                    : {
                        rx: [0, this.columns.length],
                        ry: [0, this._options.maxRows],
                      };
              let l;
              if (t) l = n(i, s, e, r[0], r[1] - 1, h[0], h[1] - 1);
              else {
                const t = n(s, i, e, h[0], h[1] - 1, r[0], r[1] - 1);
                l = { x: t.y, y: t.x };
              }
              this._fitBounds(l) &&
                (this._stopEditing(),
                this._incrementToFit(l),
                this._changeSelectedCellsStyle(() => {
                  (this._focus = l),
                    o <= 1 && (this._selectionStart = this._selectionEnd = l);
                }),
                this._scrollIntoView(l));
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
            _startEditing({ x: t, y: e }, i = !1) {
              this._editing = { x: t, y: e };
              const s = this._getCell(t, e);
              if (
                (this._columStyleChgFlag(t, i) && this._chgStyle(t, e, s),
                this._noEditFlag(t, e) || this._btnRowDelFlag(t))
              )
                return;
              const n = s.getBoundingClientRect(),
                o = s.firstChild.getBoundingClientRect();
              if ("SELECT" == s.firstChild.nodeName) return;
              if (((this._option_pos = {}), "SELECT" !== s.firstChild.nodeName))
                try {
                  s.removeChild(s.firstChild);
                } catch (t) {
                  return;
                }
              const r = document.createElement("input"),
                h = document.createElement("select");
              let l = !0;
              this._options.select.length > 0
                ? (this._options.select.forEach((i, o) => {
                    t === i.rowIndex &&
                      ((h.value = this._getVal(t, e)),
                      s.appendChild(h),
                      Object.assign(s.style, {
                        width: n.width - 2,
                        height: n.height,
                      }),
                      Object.assign(h.style, {
                        width: n.width - 2,
                        height: n.height - 2,
                        outline: "none",
                        background: "transparent",
                      }),
                      h.focus(),
                      h.addEventListener("blur", this._stopEditing),
                      h.addEventListener("keydown", this._cancelKeyOnSelect),
                      h.addEventListener("change", this._selectChange),
                      this._options.select[o].selectableInfo.forEach((i) => {
                        const s = document.createElement("option");
                        i.text == this._getVal(t, e) && (s.selected = !0),
                          (s.text = i.text),
                          (s.value = i.text),
                          h.appendChild(s);
                      }),
                      (l = !1),
                      (this._option_pos.x = t),
                      (this._option_pos.y = e));
                  }),
                  l &&
                    ((r.type = "text"),
                    (r.value = this._getVal(t, e)),
                    s.appendChild(r),
                    Object.assign(s.style, {
                      width: n.width - 2,
                      height: n.height,
                    }),
                    Object.assign(r.style, {
                      width: `${o.width}px`,
                      height: n.height - 2,
                      outline: "none",
                      background: "transparent",
                    }),
                    r.focus(),
                    r.addEventListener("blur", this._stopEditing),
                    r.addEventListener("keydown", this._blurIfEnter)))
                : ((r.type = "text"),
                  (r.value = this._getVal(t, e)),
                  s.appendChild(r),
                  Object.assign(s.style, {
                    width: n.width - 2,
                    height: n.height,
                  }),
                  Object.assign(r.style, {
                    width: `${o.width}px`,
                    height: n.height - 2,
                    outline: "none",
                    background: "transparent",
                  }),
                  r.focus(),
                  r.addEventListener("blur", this._stopEditing),
                  r.addEventListener("keydown", this._blurIfEnter));
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
            _restyleAll() {
              for (var t = 0; t < this._width; t++)
                for (var e = 0; e < this._height; e++)
                  this._restyle({ x: t, y: e });
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
                (n += " " + a(this.checkResults.classNames, t, e)),
                n
              );
            }
            _getCoords(t) {
              let e = t.target;
              for (
                ;
                e.getAttribute && !e.getAttribute("x") && e.parentElement;

              )
                e = e.parentElement;
              return {
                x: parseInt(e.getAttribute("x")) || 0,
                y: parseInt(e.getAttribute("y")) || 0,
              };
            }
            _isValidCoords(t) {
              let e = t.target;
              for (
                ;
                e.getAttribute && !e.getAttribute("x") && e.parentElement;

              )
                e = e.parentElement;
              return !(
                null == e.getAttribute("x") || null == e.getAttribute("y")
              );
            }
            setData(t) {
              this._data._clear(), this._replaceDataWithArray(t);
              for (let t = 0; t < this._width; t++)
                for (let e = 0; e < this._height; e++)
                  this._refreshDisplayedValue({ x: t, y: e });
            }
            _replaceDataWithArray(t = [[]]) {
              t.forEach((t, e) => {
                t.forEach((i, s) => {
                  this._btnRowDelFlag(s)
                    ? this._setDelFlag(s, e, t)
                    : this._setVal(s, e, i);
                });
              });
            }
            _setVal(t, e, i) {
              this._fitBounds({ x: t, y: e }) &&
                (this._data._setVal(t, e, i),
                this._incrementToFit({ x: t + 1, y: e + 1 }),
                this._refreshDisplayedValue({ x: t, y: e }));
            }
            _setDelFlag(t, e, i) {
              if (!this._fitBounds({ x: t, y: e })) return;
              const s = i.find((t) => t) ? "1" : "";
              this._data._setVal(t, e, s),
                this._incrementToFit({ x: t + 1, y: e + 1 }),
                this._createDeleteBtnContent(t, e, s);
            }
            _getVal(t, e) {
              return this._data._getVal(t, e);
            }
            _getCell(t, e) {
              return this.tbody.children[e].children[t];
            }
            _noEditFlag(t, e) {
              return (
                this._options.noEdit[0].includes(t) ||
                this._options.noEdit[1].includes(e)
              );
            }
            _columStyleChgFlag(t, e) {
              return (
                this._options.styleChg &&
                this._options.styleChg.colum &&
                this._options.styleChg.colum[t] &&
                e
              );
            }
            _btnRowDelFlag(t) {
              return (
                this._options.btnRowDel && this._options.btnRowDel.index === +t
              );
            }
            _chgStyle(t, e, i) {
              i.hasAttribute("style") && "" !== i.getAttribute("style")
                ? (i.removeAttribute("style"), i.removeAttribute("prior"))
                : (i.setAttribute("prior", "on"),
                  Object.assign(i.style, this._options.styleChg.colum[t]),
                  this._options.styleChg.colum.link &&
                    this._options.styleChg.colum.link
                      .find((e) => e.includes(t))
                      .forEach((i) => {
                        if (i !== t) {
                          const t = this._getCell(i, e);
                          t.removeAttribute("style"),
                            t.removeAttribute("prior");
                        }
                      }));
            }
            _toArrColorFlag(t, e) {
              const i = [];
              for (let s = 0; s < e; s++) {
                i.push([]);
                for (let e = 0; e < t; e++) {
                  const t = this._getCell(e, s);
                  t.hasAttribute("prior") && "on" === t.getAttribute("prior")
                    ? i[s].push(1)
                    : i[s].push(0);
                }
              }
              return i;
            }
            _createDeleteBtnContent(t, e, i) {
              const s = this._getCell(t, e);
              if ("1" === i) {
                if (s.firstChild) return;
                const t = document.createElement("button");
                s.appendChild(t),
                  (t.innerHTML = this._options.btnRowDel.name),
                  t.addEventListener("click", () => {
                    this.setData(this.getData().filter((t, i) => i !== e));
                  });
              } else {
                if (!s.firstChild) return;
                s.removeChild(s.firstChild);
              }
            }
          }
          function a(t, e, i) {
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
      i(103)
    );
  })().default;
});
