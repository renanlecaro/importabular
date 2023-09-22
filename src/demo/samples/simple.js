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
    ["sample taro","XXXX-XXXX?","sample@samp.com"],
    ["sample taro","XXXX-XXXX?","sample@samp.com"],
    ["sample taro","XXXX-XXXX?","sample@samp.com"]
  ],
  noEdit: [
    [1,2],
    [2,3]
  ],
  styleChg: {
    colum: {
      0:{background:"red"},
      1:{background:"red"},
      link:[[0,1]]
    }
  }
});
