import Importabular from "../../index";

const sheet = new Importabular({
  node: document.getElementById("with-checks"),
  maxRows: 15,
  minRows: 4,
  rows: 4,
  columns: [
    {
      label: "Contact name",
      title: "Full name",
      placeholder: "John Doe",
      datalist: ["John", "Paul", "Julia", "Ellie"],
    },
    {
      label: "Phone number",
      title: "In the international format",
      placeholder: "+33XXXXXXX",
    },
    {
      label: "Email address",
      placeholder: "xxxx@yyyy.zzz",
    },
  ],
  data: [
    ["Name", "+333555555", "email@adress"],
    ["Bad data", "33366666", "email@"],
    ["", "", "missing@name"],
  ],
  checks: checkData,
  css: `
  td>div{
    border-right:2px solid transparent;
  }
  td.invalid >div{
    border-right:2px solid red;
    background:rgba(255,0,0,0.1);
  }
  td.valid > div{
    border-right:2px solid green;
  
  }
  
  `,
  onChange(data) {
    console.table(data);
  },
});

function checkData(data) {
  // Generate tooltip content for each problem
  const titles = data.map((line) => [
    checkName(line),
    checkPhone(line),
    checkEmail(line),
  ]);

  // Display the cell as invalid if there's a problem
  const classNames = data.map((line, index) => [
    titles[index][0] ? "invalid" : line[0] && "valid",
    titles[index][1] ? "invalid" : line[1] && "valid",
    titles[index][2] ? "invalid" : line[2] && "valid",
  ]);

  return { titles, classNames };
}

function checkName([name, phone, email]) {
  if (!name && (phone || email)) {
    return "Name is required";
  }
}
function checkPhone([name, phone, email]) {
  if (phone && !phone.match(/\+[0-9]+/)) return "Invalid phone number";
}

function checkEmail([name, phone, email]) {
  if (name && !email) return "Email is required";

  if (!email.match(/[a-z0-9.-]+@[a-z0-9.-]+/gi)) {
    return "Invalid  email address";
  }
}
