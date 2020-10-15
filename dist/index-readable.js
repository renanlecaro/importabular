function t(t, e, i) {
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
const e = [
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
    data: e = [],
    node: i = null,
    onChange: s = null,
    minRows: r = 1,
    maxRows: o = 1 / 0,
    minCols: l = 1,
    maxCols: a = 1 / 0,
    css: d = "",
    width: c = "100%",
    height: u = "80vh",
  }) {
    if (
      (t(this, "p", 1),
      t(this, "_", 1),
      t(this, "g", new n()),
      t(this, "paste", (t) => {
        if (this.R) return;
        t.preventDefault();
        const e = (function (t) {
            try {
              const e = (t.clipboardData || window.clipboardData).getData(
                  "text/html"
                ),
                i = document.createElement("iframe");
              document.body.appendChild(i),
                i.contentWindow.document.open(),
                i.contentWindow.document.write(e),
                i.contentWindow.document.close();
              const s = i.contentWindow.document.querySelectorAll("tr"),
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
          { rx: i, ry: s } = this.$,
          n = { x: i[0], y: s[0] };
        for (let t = 0; t < e.length; t++)
          for (let i = 0; i < e[0].length; i++)
            this.O(n.x + i, n.y + t, e[t][i]);
        this.j(() => {
          (this.L = n),
            (this.U = { x: n.x + e[0].length - 1, y: n.y + e.length - 1 });
        }),
          this.v();
      }),
      t(this, "copy", (t) => {
        if (this.R) return;
        const e = this.B();
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
      t(this, "cut", (t) => {
        this.R || (this.copy(t), this.H(""));
      }),
      t(this, "keydown", (t) => {
        t.ctrlKey ||
          (this.L &&
            ("Escape" === t.key &&
              this.R &&
              (t.preventDefault(), this.W(), this.N()),
            "Enter" === t.key &&
              (t.preventDefault(), this.P(!1, t.shiftKey ? -1 : 1)),
            "Tab" === t.key &&
              (t.preventDefault(), this.P(!0, t.shiftKey ? -1 : 1)),
            this.R ||
              (("Delete" !== t.key && "Backspace" !== t.key) ||
                (t.preventDefault(), this.H("")),
              "ArrowDown" === t.key &&
                (t.preventDefault(), this.Y({ y: 1 }, t.shiftKey)),
              "ArrowUp" === t.key &&
                (t.preventDefault(), this.Y({ y: -1 }, t.shiftKey)),
              "ArrowLeft" === t.key &&
                (t.preventDefault(), this.Y({ x: -1 }, t.shiftKey)),
              "ArrowRight" === t.key &&
                (t.preventDefault(), this.Y({ x: 1 }, t.shiftKey))),
            1 !== t.key.length ||
              this.R ||
              this.j(() => {
                const { x: t, y: e } = this.q;
                this.F({ x: t, y: e }), (this.G(t, e).firstChild.value = "");
              })));
      }),
      t(this, "tt", !1),
      t(this, "L", null),
      t(this, "U", null),
      t(this, "$", { rx: [0, 0], ry: [0, 0] }),
      t(this, "R", null),
      t(this, "q", null),
      t(this, "mousedown", (t) => {
        if (!this.mobile) {
          if (3 === t.which && !this.R && this.Z()) {
            let t = new Range();
            const { rx: e, ry: i } = this.$;
            return (
              t.setStart(this.G(e[0], i[0]), 0),
              t.setEnd(this.G(e[0], i[0]), 1),
              this.cwd.getSelection().removeAllRanges(),
              void this.cwd.getSelection().addRange(t)
            );
          }
          this.j(() => {
            (this.tbody.style.userSelect = "none"),
              (this.U = this.L = this.q = this.it(t)),
              (this.tt = !0);
          });
        }
      }),
      t(this, "mouseenter", (t) => {
        this.mobile ||
          (this.tt &&
            this.j(() => {
              this.U = this.it(t);
            }));
      }),
      t(this, "st", null),
      t(this, "nt", null),
      t(this, "mouseup", (t) => {
        this.mobile ||
          (3 !== t.which &&
            this.tt &&
            this.j(() => {
              (this.U = this.it(t)),
                this.et(),
                this.st &&
                  this.st > Date.now() - 300 &&
                  this.nt.x === this.U.x &&
                  this.nt.y === this.U.y &&
                  this.F(this.U),
                (this.st = Date.now()),
                (this.nt = this.U);
            }));
      }),
      t(this, "mouseleave", (t) => {
        t.target === this.tbody && this.tt && this.et();
      }),
      t(this, "touchstart", (t) => {
        this.R || ((this.mobile = !0), (this.moved = !1));
      }),
      t(this, "touchend", (t) => {
        this.mobile &&
          (this.R ||
            this.moved ||
            (this.j(() => {
              this.U = this.L = this.q = this.it(t);
            }),
            this.F(this.q)));
      }),
      t(this, "touchmove", (t) => {
        this.mobile && (this.moved = !0);
      }),
      t(this, "N", () => {
        if (!this.R) return;
        const { x: t, y: e } = this.R,
          i = this.G(t, e);
        (i.style.width = ""), (i.style.height = "");
        const s = i.firstChild;
        s.removeEventListener("blur", this.N),
          s.removeEventListener("keydown", this.ht),
          this.O(t, e, s.value),
          i.removeChild(s),
          (this.R = null),
          this.I(i, t, e),
          this.v();
      }),
      t(this, "ht", (t) => {
        13 === t.keyCode && (this.N(), t.preventDefault());
      }),
      t(this, "A", ({ x: t, y: e }) => {
        this.G(t, e).className = this.ot(t, e);
      }),
      t(this, "K", ({ x: t, y: e }) => {
        const i = this.G(t, e).firstChild;
        "DIV" === i.tagName && (i.textContent = this.k(t, e)),
          this.A({ x: t, y: e });
      }),
      !i)
    )
      throw new Error(
        "You need to pass a node argument to Importabular, like this : new Importabular({node: document.body})"
      );
    (this.t = i),
      (this.i = {
        onChange: s,
        minRows: r,
        maxRows: o,
        minCols: l,
        maxCols: a,
        css: h + d,
      }),
      (this.h = {
        width: c,
        height: u,
        border: "none",
        background: "transparent",
      }),
      this.o(),
      this.l(e),
      this.u({ x: this.i.minCols - 1, y: this.i.minRows - 1 }),
      this.m();
  }
  C({ x: t, y: e }) {
    return t >= 0 && t < this.i.maxCols && e >= 0 && e < this.i.maxRows;
  }
  m() {
    const t = Math.ceil(this.iframe.contentWindow.innerHeight / 40),
      e = Math.ceil(this.iframe.contentWindow.innerWidth / 100);
    this.u({ x: e - 1, y: t - 1 });
  }
  v() {
    this.i.onChange && this.i.onChange(this.g.D());
  }
  I(t, e, i) {
    const s = document.createElement("div");
    t.setAttribute("x", e.toString()), t.setAttribute("y", i.toString());
    const n = this.k(e, i);
    n ? (s.textContent = n) : (s.innerHTML = "&nbsp;"),
      t.appendChild(s),
      this.A({ x: e, y: i });
  }
  o() {
    const t = document.createElement("iframe");
    (this.iframe = t), this.t.appendChild(t);
    const i = t.contentWindow.document;
    (this.cwd = i),
      i.open(),
      i.write(
        `<html lang="${navigator.language}"><body><style>${this.i.css}</style></body></html>`
      ),
      i.close(),
      Object.assign(t.style, this.h);
    const s = document.createElement("table"),
      n = document.createElement("tbody");
    s.appendChild(n), i.body.appendChild(s), (this.tbody = n), (this.table = s);
    for (let t = 0; t < this._; t++) {
      const e = document.createElement("tr");
      n.appendChild(e);
      for (let i = 0; i < this.p; i++) this.S(e, i, t);
    }
    e.forEach((t) => i.addEventListener(t, this[t], !0));
  }
  destroy() {
    this.T(),
      e.forEach((t) => this.cwd.removeEventListener(t, this[t], !0)),
      this.iframe.parentElement.removeChild(this.iframe);
  }
  S(t, e, i) {
    const s = document.createElement("td");
    t.appendChild(s), this.I(s, e, i);
  }
  M() {
    if (!this.C({ x: 0, y: this._ })) return !1;
    this._++;
    const t = this._ - 1,
      e = document.createElement("tr");
    this.tbody.appendChild(e);
    for (let i = 0; i < this.p; i++) this.S(e, i, t);
    return !0;
  }
  V() {
    if (!this.C({ x: this.p, y: 0 })) return !1;
    this.p++;
    const t = this.p - 1;
    return (
      Array.prototype.forEach.call(this.tbody.children, (e, i) => {
        this.S(e, t, i);
      }),
      !0
    );
  }
  u({ x: t, y: e }) {
    for (; t > this.p - 1 && this.V(); );
    for (; e > this._ - 1 && this.M(); );
  }
  B() {
    const { rx: t, ry: e } = this.$;
    if (t[0] === t[1]) return null;
    const i = t[1] - t[0],
      s = e[1] - e[0],
      n = [];
    for (let h = 0; h < s; h++) {
      n.push([]);
      for (let s = 0; s < i; s++) n[h].push(this.k(t[0] + s, e[0] + h));
    }
    return n;
  }
  H(t) {
    this.J(this.$, ({ x: e, y: i }) => this.O(e, i, t)),
      this.J(this.$, this.K),
      this.v();
  }
  Y({ x: t = 0, y: e = 0 }, i) {
    const s = i ? this.U : this.L,
      n = { x: s.x + t, y: s.y + e };
    this.C(n) &&
      (this.N(),
      this.u(n),
      this.j(() => {
        i ? (this.U = n) : (this.L = this.U = this.q = n);
      }),
      this.X(n));
  }
  P(t, e = 1) {
    let { x: i, y: n } = this.q || { x: 0, y: 0 };
    const h = this.Z(),
      { rx: r, ry: o } =
        h > 1 ? this.$ : { rx: [0, this.i.maxCols], ry: [0, this.i.maxRows] };
    let l;
    if (t) l = s(i, n, e, r[0], r[1] - 1, o[0], o[1] - 1);
    else {
      const t = s(n, i, e, o[0], o[1] - 1, r[0], r[1] - 1);
      l = { x: t.y, y: t.x };
    }
    this.C(l) &&
      (this.N(),
      this.u(l),
      this.j(() => {
        (this.q = l), h <= 1 && (this.L = this.U = l);
      }),
      this.X(l));
  }
  X({ x: t, y: e }) {
    this.G(t, e).scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  et() {
    (this.tt = !1), (this.tbody.style.userSelect = "");
  }
  F({ x: t, y: e }) {
    this.R = { x: t, y: e };
    const i = this.G(t, e),
      s = i.getBoundingClientRect(),
      n = i.firstChild.getBoundingClientRect();
    i.removeChild(i.firstChild);
    const h = document.createElement("input");
    (h.type = "text"),
      (h.value = this.k(t, e)),
      i.appendChild(h),
      Object.assign(i.style, { width: s.width - 2, height: s.height }),
      Object.assign(h.style, {
        width: n.width + "px",
        height: n.height + "px",
      }),
      h.focus(),
      h.addEventListener("blur", this.N),
      h.addEventListener("keydown", this.ht);
  }
  T() {
    if (this.R) {
      const { x: t, y: e } = this.R,
        i = this.G(t, e).firstChild;
      i.removeEventListener("blur", this.N),
        i.removeEventListener("keydown", this.ht);
    }
  }
  W() {
    if (!this.R) return;
    const { x: t, y: e } = this.R;
    this.G(t, e).firstChild.value = this.k(t, e);
  }
  j(t) {
    const e = this.$;
    t(), (this.$ = this.rt()), this.J(e, this.A), this.J(this.$, this.A);
  }
  rt() {
    if (!this.L) return { rx: [0, 0], ry: [0, 0] };
    let t = [this.L.x, this.U.x];
    t[0] > t[1] && t.reverse();
    let e = [this.L.y, this.U.y];
    return (
      e[0] > e[1] && e.reverse(), { rx: [t[0], t[1] + 1], ry: [e[0], e[1] + 1] }
    );
  }
  J({ rx: t, ry: e }, i) {
    for (let s = t[0]; s < t[1]; s++)
      for (let t = e[0]; t < e[1]; t++)
        this.C({ x: s, y: t }) && i({ x: s, y: t });
  }
  Z() {
    const { rx: t, ry: e } = this.$;
    return (t[1] - t[0]) * (e[1] - e[0]);
  }
  ot(t, e) {
    const { rx: i, ry: s } = this.$;
    let n = "";
    return (
      t >= i[0] &&
        t < i[1] &&
        e >= s[0] &&
        e < s[1] &&
        ((n += " selected"), this.Z() > 1 && (n += " multi")),
      this.q && this.q.x === t && this.q.y === e && (n += " focus"),
      this.R && t === this.R.x && e === this.R.y && (n += " editing"),
      n
    );
  }
  it(t) {
    let e = t.target;
    for (; !e.getAttribute("x") && e.parentElement; ) e = e.parentElement;
    return {
      x: parseInt(e.getAttribute("x")) || 0,
      y: parseInt(e.getAttribute("y")) || 0,
    };
  }
  setData(t) {
    this.g.lt(), this.l(t);
    for (let t = 0; t < this.p; t++)
      for (let e = 0; e < this._; e++) this.K({ x: t, y: e });
  }
  getData() {
    return this.g.D();
  }
  l(t) {
    t.forEach((t, e) => {
      t.forEach((t, i) => {
        this.O(i, e, t);
      });
    });
  }
  O(t, e, i) {
    this.C({ x: t, y: e }) &&
      (this.g.O(t, e, i),
      this.u({ x: t + 1, y: e + 1 }),
      this.K({ x: t, y: e }));
  }
  k(t, e) {
    return this.g.k(t, e);
  }
  G(t, e) {
    return this.tbody.children[e].children[t];
  }
}
function s(t, e, i, s, n, h, r) {
  if ((t += i) < s) {
    if (n === 1 / 0) return { x: s, y: e };
    if (((t = n), --e < h)) {
      if (r === 1 / 0) return { x: s, y: h };
      e = r;
    }
  }
  return t > n && ((t = s), ++e > r && ((e = h), (t = s))), { x: t, y: e };
}
class n {
  constructor() {
    t(this, "g", {});
  }
  O(t, e, i) {
    const s = this.g,
      n = (function (t) {
        return 0 === t ? "0" : t ? t.toString() : "";
      })(i);
    n
      ? (s[t] || (s[t] = {}), (s[t][e] = n))
      : s[t] &&
        s[t][e] &&
        (delete s[t][e],
        (function (t) {
          return 0 === Object.keys(t).length;
        })(s[t]) && delete s[t]);
  }
  lt() {
    this.g = {};
  }
  k(t, e) {
    const i = this.g;
    return (i && i[t] && i[t][e]) || "";
  }
  D() {
    let t = 1,
      e = 1;
    for (let i in this.g)
      for (let s in this.g[i])
        (e = Math.max(e, parseInt(s) + 1)), (t = Math.max(t, parseInt(i) + 1));
    const i = [];
    for (let s = 0; s < e; s++) {
      i.push([]);
      for (let e = 0; e < t; e++) i[s].push(this.k(e, s));
    }
    return i;
  }
}
const h =
  "\nhtml{\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n::-webkit-scrollbar {\n  visibility: hidden;\n}\n*{\n  box-sizing: border-box;\n}\nbody{\n  padding: 0; \n  margin: 0;\n}\ntable{\n  border-spacing: 0;\n  background: white;\n  border: 1px solid #ddd;\n  border-width: 0 1px 1px 0;\n  font-size: 16px;\n  font-family: sans-serif;\n  border-collapse: separate;\n}\ntd{\n  padding:0;\n  border: 1px solid;\n  border-color: #ddd transparent transparent #ddd; \n}\ntd.selected.multi:not(.editing){\n  background:#d7f2f9;\n} \ntd.focus:not(.editing){\n  border-color: black;\n} \ntd>*{\n  border:none;\n  padding:10px;\n  min-width:100px;\n  min-height: 40px;\n  font:inherit;\n  line-height: 20px;\n  color:inherit;\n  white-space: normal;\n}\ntd>div::selection {\n    color: none;\n    background: none;\n}\n";
