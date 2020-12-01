import TableWithHeaders from "../../withHeaders.js";

new TableWithHeaders({
  node: document.getElementById("editor-with-headers"),
  columns: [
    {
      label: "Contact name",
      placeholder: "Jean DUPONT",
      title: "Full name of you client, without particles",
    },
    {
      label: "Phone number",
      placeholder: "+495555555",
      title:
        "Phone number of the client (in the international format). Optional",
    },
    {
      label: "Email address",
      placeholder: "aaaa@bbb.fr",
    },
  ],
  data: [["Jean", "+3365555555", "jean@"]],
  checks: checkData,
  css: `
          .invalid div{
            color:red;
          }
          `,
});

function nameOk([name, phone, email]) {
  return name || (!phone && !email);
}
function phoneOk([name, phone, email]) {
  return !phone || phone.match(/\+[0-9]+/);
}

function emailOk([name, phone, email]) {
  return email && email.match(/[a-z0-9.-]+@[a-z0-9.-]+/gi);
}

function checkData(data) {
  const titles = data.map((line) => [
    nameOk(line) ? "" : "Name is required",
    phoneOk(line) ? "" : "Invalid phone number",
    emailOk(line) ? "" : "Invalid  email address",
  ]);

  const classNames = data.map((line) => [
    nameOk(line) ? "" : "invalid",
    phoneOk(line) ? "" : "invalid",
    emailOk(line) ? "" : "invalid",
  ]);

  return { titles, classNames };
}
