import Importabular from "../..";

// Changing the content of one editor should update the other one too
let ed1 = new Importabular({
  node: document.getElementById("editor-clone-1"),
  onChange: (data) => ed2.setData(data),
});
let ed2 = new Importabular({
  node: document.getElementById("editor-clone-2"),
  onChange: (data) => ed1.setData(data),
});
