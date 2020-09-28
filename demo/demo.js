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
