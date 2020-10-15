function t(t, s, i) {
  return (
    s in t
      ? Object.defineProperty(t, s, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[s] = i),
    t
  );
}
const s = [
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
export default class i {
  constructor({
    data: s = [],
    node: i = null,
    onChange: h = null,
    minRows: r = 1,
    maxRows: o = 1 / 0,
    minCols: l = 1,
    maxCols: c = 1 / 0,
    css: a = "",
    width: d = "100%",
    height: u = "80vh",
  }) {
    if (
      (t(this, "paste", (t) => {
        if (this.t) return;
        t.preventDefault();
        const s = (function (t) {
            try {
              const s = (t.clipboardData || window.clipboardData).getData(
                  "text/html"
                ),
                i = document.createElement("iframe");
              document.body.appendChild(i),
                i.contentWindow.document.open(),
                i.contentWindow.document.write(s),
                i.contentWindow.document.close();
              const h = i.contentWindow.document.querySelectorAll("tr"),
                e = [];
              if (
                (Array.prototype.forEach.call(h, (t, s) => {
                  const i = t.querySelectorAll("td");
                  Array.prototype.forEach.call(i, (t, i) => {
                    const h = t.textContent;
                    e[s] || (e[s] = []), (e[s][i] = h);
                  });
                }),
                document.body.removeChild(i),
                e.length)
              )
                return e;
            } catch (t) {}
            return (t.clipboardData || window.clipboardData)
              .getData("text")
              .split(/\r\n|\n|\r/)
              .map((t) => t.split(""));
          })(t),
          { rx: i, ry: h } = this.i,
          e = { x: i[0], y: h[0] };
        for (let t = 0; t < s.length; t++)
          for (let i = 0; i < s[0].length; i++)
            this.h(e.x + i, e.y + t, s[t][i]);
        this.o(() => {
          (this.l = e),
            (this.u = { x: e.x + s[0].length - 1, y: e.y + s.length - 1 });
        }),
          this.m();
      }),
      t(this, "copy", (t) => {
        if (this.t) return;
        const s = this.p();
        s &&
          (t.preventDefault(),
          t.clipboardData.setData(
            "text/html",
            (function (t) {
              const s = document.createElement("table");
              return (
                s.setAttribute("lang", navigator.language),
                t.forEach((t) => {
                  const i = document.createElement("tr");
                  s.appendChild(i),
                    t.forEach((t) => {
                      const s = document.createElement("td");
                      i.appendChild(s), (s.textContent = t);
                    });
                }),
                `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html lang="${navigator.language}"><head>\n<meta http-equiv="content-type" content="text/html; charset=utf-8"/><title></title></head><body>${s.outerHTML}</body></html>`
              );
            })(s)
          ),
          t.clipboardData.setData(
            "text/plain",
            s.map((t) => t.join("")).join("\n")
          ));
      }),
      t(this, "cut", (t) => {
        this.t || (this.copy(t), this.g(""));
      }),
      t(this, "keydown", (t) => {
        t.ctrlKey ||
          (this.l &&
            ("Escape" === t.key &&
              this.t &&
              (t.preventDefault(), this._(), this.C()),
            "Enter" === t.key &&
              (t.preventDefault(), this.v(!1, t.shiftKey ? -1 : 1)),
            "Tab" === t.key &&
              (t.preventDefault(), this.v(!0, t.shiftKey ? -1 : 1)),
            this.t ||
              (("Delete" !== t.key && "Backspace" !== t.key) ||
                (t.preventDefault(), this.g("")),
              "ArrowDown" === t.key &&
                (t.preventDefault(), this.D({ y: 1 }, t.shiftKey)),
              "ArrowUp" === t.key &&
                (t.preventDefault(), this.D({ y: -1 }, t.shiftKey)),
              "ArrowLeft" === t.key &&
                (t.preventDefault(), this.D({ x: -1 }, t.shiftKey)),
              "ArrowRight" === t.key &&
                (t.preventDefault(), this.D({ x: 1 }, t.shiftKey))),
            1 !== t.key.length ||
              this.t ||
              this.o(() => {
                const { x: t, y: s } = this.k;
                this.A({ x: t, y: s }), (this.S(t, s).firstChild.value = "");
              })));
      }),
      t(this, "_selecting", !1),
      t(this, "_selectionStart", null),
      t(this, "_selectionEnd", null),
      t(this, "_selection", { rx: [0, 0], ry: [0, 0] }),
      t(this, "_editing", null),
      t(this, "_focus", null),
      t(this, "mousedown", (t) => {
        if (!this.mobile) {
          if (3 === t.which && !this.t && this.I()) {
            let t = new Range();
            const { rx: s, ry: i } = this.i;
            return (
              t.setStart(this.S(s[0], i[0]), 0),
              t.setEnd(this.S(s[0], i[0]), 1),
              this.cwd.getSelection().removeAllRanges(),
              void this.cwd.getSelection().addRange(t)
            );
          }
          this.o(() => {
            (this.tbody.style.userSelect = "none"),
              (this.u = this.l = this.k = this.T(t)),
              (this.M = !0);
          });
        }
      }),
      t(this, "mouseenter", (t) => {
        this.mobile ||
          (this.M &&
            this.o(() => {
              this.u = this.T(t);
            }));
      }),
      t(this, "_lastMouseUp", null),
      t(this, "_lastMouseUpTarget", null),
      t(this, "mouseup", (t) => {
        this.mobile ||
          (3 !== t.which &&
            this.M &&
            this.o(() => {
              (this.u = this.T(t)),
                this.V(),
                this.O &&
                  this.O > Date.now() - 300 &&
                  this.R.x === this.u.x &&
                  this.R.y === this.u.y &&
                  this.A(this.u),
                (this.O = Date.now()),
                (this.R = this.u);
            }));
      }),
      t(this, "mouseleave", (t) => {
        t.target === this.tbody && this.M && this.V();
      }),
      t(this, "touchstart", (t) => {
        this.t || ((this.mobile = !0), (this.moved = !1));
      }),
      t(this, "touchend", (t) => {
        this.mobile &&
          (this.t ||
            this.moved ||
            (this.o(() => {
              this.u = this.l = this.k = this.T(t);
            }),
            this.A(this.k)));
      }),
      t(this, "touchmove", (t) => {
        this.mobile && (this.moved = !0);
      }),
      t(this, "_stopEditing", () => {
        if (!this.t) return;
        const { x: t, y: s } = this.t,
          i = this.S(t, s);
        (i.style.width = ""), (i.style.height = "");
        const h = i.firstChild;
        h.removeEventListener("blur", this.C),
          h.removeEventListener("keydown", this.j),
          this.h(t, s, h.value),
          i.removeChild(h),
          (this.t = null),
          this.L(i, t, s),
          this.m();
      }),
      t(this, "_blurIfEnter", (t) => {
        13 === t.keyCode && (this.C(), t.preventDefault());
      }),
      t(this, "_restyle", ({ x: t, y: s }) => {
        this.S(t, s).className = this.U(t, s);
      }),
      t(this, "_refreshDisplayedValue", ({ x: t, y: s }) => {
        const i = this.S(t, s).firstChild;
        "DIV" === i.tagName && (i.textContent = this.$(t, s)),
          this.B({ x: t, y: s });
      }),
      !i)
    )
      throw new Error(
        "You need to pass a node argument to Importabular, like this : new Importabular({node: document.body})"
      );
    (this.H = i),
      (this.W = {
        onChange: h,
        minRows: r,
        maxRows: o,
        minCols: l,
        maxCols: c,
        css: n + a,
      }),
      (this.N = {
        width: d,
        height: u,
        border: "none",
        background: "transparent",
      }),
      (this.P = 1),
      (this.Y = 1),
      (this.q = new e()),
      this.F(),
      this.G(s),
      this.J({ x: this.W.minCols - 1, y: this.W.minRows - 1 }),
      this.K();
  }
  X({ x: t, y: s }) {
    return t >= 0 && t < this.W.maxCols && s >= 0 && s < this.W.maxRows;
  }
  K() {
    const t = Math.ceil(this.iframe.contentWindow.innerHeight / 40),
      s = Math.ceil(this.iframe.contentWindow.innerWidth / 100);
    this.J({ x: s - 1, y: t - 1 });
  }
  m() {
    this.W.onChange && this.W.onChange(this.q.Z());
  }
  L(t, s, i) {
    const h = document.createElement("div");
    t.setAttribute("x", s.toString()), t.setAttribute("y", i.toString());
    const e = this.$(s, i);
    e ? (h.textContent = e) : (h.innerHTML = "&nbsp;"),
      t.appendChild(h),
      this.B({ x: s, y: i });
  }
  F() {
    const t = document.createElement("iframe");
    (this.iframe = t), this.H.appendChild(t);
    const i = t.contentWindow.document;
    (this.cwd = i),
      i.open(),
      i.write(
        `<html lang="${navigator.language}"><body><style>${this.W.css}</style></body></html>`
      ),
      i.close(),
      Object.assign(t.style, this.N);
    const h = document.createElement("table"),
      e = document.createElement("tbody");
    h.appendChild(e), i.body.appendChild(h), (this.tbody = e), (this.table = h);
    for (let t = 0; t < this.Y; t++) {
      const s = document.createElement("tr");
      e.appendChild(s);
      for (let i = 0; i < this.P; i++) this.tt(s, i, t);
    }
    s.forEach((t) => i.addEventListener(t, this[t], !0));
  }
  destroy() {
    this.st(),
      s.forEach((t) => this.cwd.removeEventListener(t, this[t], !0)),
      this.iframe.parentElement.removeChild(this.iframe);
  }
  tt(t, s, i) {
    const h = document.createElement("td");
    t.appendChild(h), this.L(h, s, i);
  }
  it() {
    if (!this.X({ x: 0, y: this.Y })) return !1;
    this.Y++;
    const t = this.Y - 1,
      s = document.createElement("tr");
    this.tbody.appendChild(s);
    for (let i = 0; i < this.P; i++) this.tt(s, i, t);
    return !0;
  }
  ht() {
    if (!this.X({ x: this.P, y: 0 })) return !1;
    this.P++;
    const t = this.P - 1;
    return (
      Array.prototype.forEach.call(this.tbody.children, (s, i) => {
        this.tt(s, t, i);
      }),
      !0
    );
  }
  J({ x: t, y: s }) {
    for (; t > this.P - 1 && this.ht(); );
    for (; s > this.Y - 1 && this.it(); );
  }
  p() {
    const { rx: t, ry: s } = this.i;
    if (t[0] === t[1]) return null;
    const i = t[1] - t[0],
      h = s[1] - s[0],
      e = [];
    for (let n = 0; n < h; n++) {
      e.push([]);
      for (let h = 0; h < i; h++) e[n].push(this.$(t[0] + h, s[0] + n));
    }
    return e;
  }
  g(t) {
    this.et(this.i, ({ x: s, y: i }) => this.h(s, i, t)),
      this.et(this.i, this.nt),
      this.m();
  }
  D({ x: t = 0, y: s = 0 }, i) {
    const h = i ? this.u : this.l,
      e = { x: h.x + t, y: h.y + s };
    this.X(e) &&
      (this.C(),
      this.J(e),
      this.o(() => {
        i ? (this.u = e) : (this.l = this.u = this.k = e);
      }),
      this.rt(e));
  }
  v(t, s = 1) {
    let { x: i, y: e } = this.k || { x: 0, y: 0 };
    const n = this.I(),
      { rx: r, ry: o } =
        n > 1 ? this.i : { rx: [0, this.W.maxCols], ry: [0, this.W.maxRows] };
    let l;
    if (t) l = h(i, e, s, r[0], r[1] - 1, o[0], o[1] - 1);
    else {
      const t = h(e, i, s, o[0], o[1] - 1, r[0], r[1] - 1);
      l = { x: t.y, y: t.x };
    }
    this.X(l) &&
      (this.C(),
      this.J(l),
      this.o(() => {
        (this.k = l), n <= 1 && (this.l = this.u = l);
      }),
      this.rt(l));
  }
  rt({ x: t, y: s }) {
    this.S(t, s).scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  V() {
    (this.M = !1), (this.tbody.style.userSelect = "");
  }
  A({ x: t, y: s }) {
    this.t = { x: t, y: s };
    const i = this.S(t, s),
      h = i.getBoundingClientRect(),
      e = i.firstChild.getBoundingClientRect();
    Object.assign(i.style, { width: h.width - 2, height: h.height }),
      i.removeChild(i.firstChild);
    const n = document.createElement("input");
    (n.type = "text"),
      (n.value = this.$(t, s)),
      Object.assign(n.style, { width: e.width, height: e.height }),
      i.appendChild(n),
      n.focus(),
      n.addEventListener("blur", this.C),
      n.addEventListener("keydown", this.j);
  }
  st() {
    if (this.t) {
      const { x: t, y: s } = this.t,
        i = this.S(t, s).firstChild;
      i.removeEventListener("blur", this.C),
        i.removeEventListener("keydown", this.j);
    }
  }
  _() {
    if (!this.t) return;
    const { x: t, y: s } = this.t;
    this.S(t, s).firstChild.value = this.$(t, s);
  }
  o(t) {
    const s = this.i;
    t(), (this.i = this.ot()), this.et(s, this.B), this.et(this.i, this.B);
  }
  ot() {
    if (!this.l) return { rx: [0, 0], ry: [0, 0] };
    let t = [this.l.x, this.u.x];
    t[0] > t[1] && t.reverse();
    let s = [this.l.y, this.u.y];
    return (
      s[0] > s[1] && s.reverse(), { rx: [t[0], t[1] + 1], ry: [s[0], s[1] + 1] }
    );
  }
  et({ rx: t, ry: s }, i) {
    for (let h = t[0]; h < t[1]; h++)
      for (let t = s[0]; t < s[1]; t++)
        this.X({ x: h, y: t }) && i({ x: h, y: t });
  }
  I() {
    const { rx: t, ry: s } = this.i;
    return (t[1] - t[0]) * (s[1] - s[0]);
  }
  U(t, s) {
    const { rx: i, ry: h } = this.i;
    let e = "";
    return (
      t >= i[0] &&
        t < i[1] &&
        s >= h[0] &&
        s < h[1] &&
        ((e += " selected"), this.I() > 1 && (e += " multi")),
      this.k && this.k.x === t && this.k.y === s && (e += " focus"),
      this.t && t === this.t.x && s === this.t.y && (e += " editing"),
      e
    );
  }
  T(t) {
    let s = t.target;
    for (; !s.getAttribute("x") && s.parentElement; ) s = s.parentElement;
    return {
      x: parseInt(s.getAttribute("x")) || 0,
      y: parseInt(s.getAttribute("y")) || 0,
    };
  }
  setData(t) {
    this.q.lt(), this.G(t);
    for (let t = 0; t < this.P; t++)
      for (let s = 0; s < this.Y; s++) this.nt({ x: t, y: s });
  }
  getData() {
    return this.q.Z();
  }
  G(t) {
    t.forEach((t, s) => {
      t.forEach((t, i) => {
        this.h(i, s, t);
      });
    });
  }
  h(t, s, i) {
    this.X({ x: t, y: s }) &&
      (this.q.h(t, s, i),
      this.J({ x: t + 1, y: s + 1 }),
      this.nt({ x: t, y: s }));
  }
  $(t, s) {
    return this.q.$(t, s);
  }
  S(t, s) {
    return this.tbody.children[s].children[t];
  }
}
function h(t, s, i, h, e, n, r) {
  if ((t += i) < h) {
    if (e === 1 / 0) return { x: h, y: s };
    if (((t = e), --s < n)) {
      if (r === 1 / 0) return { x: h, y: n };
      s = r;
    }
  }
  return t > e && ((t = h), ++s > r && ((s = n), (t = h))), { x: t, y: s };
}
class e {
  constructor() {
    t(this, "_data", {});
  }
  h(t, s, i) {
    const h = this.q,
      e = (function (t) {
        return 0 === t ? "0" : t ? t.toString() : "";
      })(i);
    var n;
    e
      ? (h[t] || (h[t] = {}), (h[t][s] = e))
      : h[t] &&
        h[t][s] &&
        (delete h[t][s],
        (n = h[t]),
        0 === Object.keys(n).length && delete h[t]);
  }
  lt() {
    this.q = {};
  }
  $(t, s) {
    const i = this.q;
    return (i && i[t] && i[t][s]) || "";
  }
  Z() {
    let t = 1,
      s = 1;
    for (let i in this.q)
      for (let h in this.q[i])
        (s = Math.max(s, parseInt(h) + 1)), (t = Math.max(t, parseInt(i) + 1));
    const i = [];
    for (let h = 0; h < s; h++) {
      i.push([]);
      for (let s = 0; s < t; s++) i[h].push(this.$(s, h));
    }
    return i;
  }
}
const n =
  "\nhtml{\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n::-webkit-scrollbar {\n  visibility: hidden;\n}\n*{\n  box-sizing: border-box;\n}\nbody{\n  padding: 0; \n  margin: 0;\n}\ntable{\n  border-spacing: 0;\n  background: white;\n  border: 1px solid #ddd;\n  border-width: 0 1px 1px 0;\n  font-size: 16px;\n  font-family: sans-serif;\n  border-collapse: separate;\n}\ntd{\n  padding:0;\n  border: 1px solid;\n  border-color: #ddd transparent transparent #ddd; \n}\ntd.selected.multi:not(.editing){\n  background:#d7f2f9;\n} \ntd.focus:not(.editing){\n  border-color: black;\n} \ntd>*{\n  border:none;\n  padding:10px;\n  min-width:100px;\n  min-height: 40px;\n  font:inherit;\n  line-height: 20px;\n  color:inherit;\n  white-space: normal;\n}\ntd>div::selection {\n    color: none;\n    background: none;\n}\n";
