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
    {
      label: "remove",
    },
  ],
  data:[
    ["sample taro1","XXXX-XXXX?","sample@samp.com",""],
    ["sample taro2","XXXX-XXXX?","sample@samp.com",""],
    ["sample taro3","XXXX-XXXX?","sample@samp.com",""],
    ["sample taro4","XXXX-XXXX?","sample@samp.com",""],
    ["sample taro5","XXXX-XXXX?","sample@samp.com",""]
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
  },
  btnRowDel : {
    index:3,
    name:"remove",
    class:"delete-btn"
  }
});