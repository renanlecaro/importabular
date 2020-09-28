import Importabular from "../dist/index.js";
import "./demo.css";

window.sheet = new Importabular({
  data: [
    ["Product ID", "Product name", "Price", "Unit", "Category"],
    ["256", "Sample product", "2.5", "Piece", "Stuffs"],
    ["122", "Pre mix drink", "5", "Bottle", "Drinks"],
  ],
  node: document.getElementById("editorNode"),
  maxCols: 5,
});

console.info(`

You can play around with the instance on the page, try :

sheet.getData()
sheet.setData([['Hello','World']])
sheet.destroy()

`);

Array.prototype.forEach.call(
  document.getElementsByClassName("readable"),
  (n) => {
    const pre = document.createElement("pre");
    pre.className = "auto";

    let js = n.innerText
      .trim()
      .replace('from "./dist/index.js"', 'from "importabular"')
      .replace('from "./src/index.js"', 'from "importabular/src/index.js"');

    const lines = js.split("\n");
    const offset = lines[1].match(/ +/)[0].length;
    js = lines
      .map((l, i) =>
        i ? (l.slice(0, offset).trim() ? l.trim() : l.slice(offset)) : l
      )
      .join("\n");

    pre.innerText = js;

    n.parentElement.appendChild(pre);
  }
);
