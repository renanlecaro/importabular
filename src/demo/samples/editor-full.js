import Importabular from "../../index.js";

function checkPhone(phone) {
  return !!phone.match(/^\+[0-9 \-]+$/im);
}
function checkEmail(email) {
  return !!email.match(/(.+)@(.+){2,}\.(.+){2,}/i);
}
function capitalize(name) {
  return name
    .split(" ")
    .map((val) => val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase())
    .join(" ");
}

class CustomEditor extends Importabular {
  _classNames(x, y) {
    return super._classNames(x, y) + " " + this.validationClasses(x, y);
  }
  validationClasses(x, y) {
    if (!y) return "header";

    const value = this._getVal(x, y);
    if (!value) return "";
    switch (x) {
      case 0:
        // Name column
        return value.length > 3 ? "ok" : "error";
      case 1:
        // Phone column
        if (!value) return "";
        return checkPhone(value) ? "ok" : "error";
      case 2:
        // Email column
        if (!value) return "";
        return checkEmail(value) ? "ok" : "error";
    }
    return "";
  }
  _setVal(x, y, val) {
    // Prevent header editing after the initial loading
    if (!y && this._getVal(x, y)) return;

    // Auto capitalize names
    if (x === 0) val = capitalize(val);

    // Auto lowercase email
    if (x === 2) val = val.toLowerCase();

    return super._setVal(x, y, val);
  }
}

const css = `
          td.header{
            background:white !important;
            font-weight:bold;
            color:black;
            pointer-event:none;
            border:none !important;
            text-transform:uppercase;
            font-size:80%;
            text-align:center;
          }
          td.ok{
            color:#5ea65e;
          }
          td.error{
            color: #a63e15;
            text-decoration: line-through;;
          }
          `;

new CustomEditor({
  node: document.getElementById("editor-full"),
  data: [
    ["Contact name", "Phone Number", "Email"],
    ["henry four", "+33628350101", "invalid@.ru"],
    ["Peter the great", "+7typo555501", "valid@email.ru"],
    ["Yi", "+6665849494948", "UPPERCASE@IGNORED.cn"],
    ["PriNce andrew", "+595949894", "prince@crown.uk"],
  ],
  maxCols: 3,
  css,
});
