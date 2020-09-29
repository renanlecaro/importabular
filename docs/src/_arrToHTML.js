
export function _arrToHTML(arr) {
  const table = document.createElement("table");
  table.setAttribute("lang", navigator.language);
  arr.forEach((row) => {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    row.forEach((cell) => {
      const td = document.createElement("td");
      tr.appendChild(td);
      td.innerText = cell;
    });
  });
  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html lang="${navigator.language}"><head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/><title></title></head><body>${table.outerHTML}</body></html>`;
}