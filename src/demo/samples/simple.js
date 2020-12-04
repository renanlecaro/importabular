import { Importabular } from "../../index.js";

const sheet = new Importabular({
  node: document.getElementById("editor"),
  columns: [
    {
      label: "Contact name",
    },
    {
      label: "Phone number",
    },
    {
      label: "Email address",
    },
  ],
});
