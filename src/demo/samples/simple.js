import Importabular from "../../index";

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
  data:[
    ["sample taro","XXXX-XXXX?","sample@samp.com"],
    ["sample taro","XXXX-XXXX?","sample@samp.com"],
    ["sample taro","XXXX-XXXX?","sample@samp.com"]
  ],
  noEdit: [
    [0,1],
    [2,3]
  ]
});
