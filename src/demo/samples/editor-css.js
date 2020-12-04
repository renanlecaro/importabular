import Importabular from "../..";

new Importabular({
  node: document.getElementById("editor-css"),
  // Make one row out of two have a darker background
  css: "tr:nth-child(2n){background:#f0f0f0};",
});
