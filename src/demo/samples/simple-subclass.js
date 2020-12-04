import Importabular from "../..";

class CustomEditor extends Importabular {
  _fillScrollSpace() {
    // We override the method responsible for filling
    // the scroll pane with empty cells. The overridden method
    // does nothing so only one cell is created at instanciation time
  }
}

new CustomEditor({
  node: document.getElementById("editor-simple-subclass"),
  data: [["I do not grow by default"]],
});
