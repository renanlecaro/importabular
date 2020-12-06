import Importabular from "../../index";

const sheet = new Importabular({
  node: document.getElementById("with-checks"),
  columns: [
    {
      label: "Contact name",
      title: "Full name",
      placeholder: "John Doe",
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
  const titles = data.map((line) => [
    nameOk(line) ? "" : "Name is required",
    phoneOk(line) ? "" : "Invalid phone number",
    emailOk(line) ? "" : "Invalid  email address",
  ]);

  const classNames = data.map((line) => [
    nameOk(line) ? line[0] && "valid" : "invalid",
    phoneOk(line) ? line[1] && "valid" : "invalid",
    emailOk(line) ? line[2] && "valid" : "invalid",
  ]);

  return { titles, classNames };
}

function nameOk([name, phone, email]) {
  return name || (!phone && !email);
}
function phoneOk([name, phone, email]) {
  return !phone || phone.match(/\+[0-9]+/);
}

function emailOk([name, phone, email]) {
  return email && email.match(/[a-z0-9.-]+@[a-z0-9.-]+/gi);
}
