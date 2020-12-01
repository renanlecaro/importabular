import _Importabular from "./index";

const customCSS = `
.placeholder div{
  user-select:none;
  color:rgba(0,0,0,0.3);
}
*[title] div{cursor:help;}
th{text-align:left;}
`;

export default class _WithHeaders extends _Importabular {
  _saveConstructorOptions({ columns, checks, data, css = "", ...rest }) {
    this.columns = columns;
    this.checks = checks || (() => ({}));
    this._runChecks(data);

    super._saveConstructorOptions({
      ...rest,
      maxCols: columns.length,
      css: css + customCSS,
    });
  }
  _runChecks(data) {
    const { titles, classNames } = this.checks(data);

    this.checkResults = {
      titles,
      classNames,
    };
  }
  _setupDom() {
    super._setupDom();
    const thead = document.createElement("THEAD");
    const tr = document.createElement("TR");
    thead.appendChild(tr);
    this.columns.forEach((col) => {
      const th = document.createElement("TH");
      const div = document.createElement("div");
      div.innerHTML = col.label;
      col.title && th.setAttribute("title", col.title);
      th.appendChild(div);
      tr.appendChild(th);
    });
    this.table.insertBefore(thead, this.tbody);
  }

  _divContent(x, y) {
    return this._getVal(x, y) || this.columns[x].placeholder;
  }

  _classNames(x, y) {
    const placeholder = this._getVal(x, y) ? "" : " placeholder";
    const validationClass = " " + _fromArr(this.checkResults.classNames, x, y);
    return super._classNames(x, y) + placeholder + validationClass;
  }
  _onDataChanged() {
    super._onDataChanged();
    this._runChecks(this._data._toArr());
  }
  _renderTDContent(td, x, y) {
    super._renderTDContent(td, x, y);
    const title = _fromArr(this.checkResults.titles, x, y);
    if (title) td.setAttribute("title", title);
    else td.removeAttribute("title");
  }
}

function _fromArr(arr, x, y) {
  return (arr && arr[y] && arr[y][x]) || "";
}
