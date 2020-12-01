export function _parsePasteEvent(event) {
  try {
    const html = (event.clipboardData || window.clipboardData).getData(
      "text/html"
    );

    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    const trs = iframe.contentWindow.document.querySelectorAll("tr");
    const data = [];
    Array.prototype.forEach.call(trs, (tr, y) => {
      const tds = tr.querySelectorAll("td");
      Array.prototype.forEach.call(tds, (td, x) => {
        const text = td.textContent;
        if (!data[y]) data[y] = [];
        data[y][x] = text;
      });
    });

    document.body.removeChild(iframe);
    if (data.length) return data;
  } catch (e) {}

  const fromText = (event.clipboardData || window.clipboardData)
    .getData("text")
    .split(/\r\n|\n|\r/)
    .map((row) => row.split(""));
  return fromText;
}
