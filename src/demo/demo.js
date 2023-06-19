import "./demo.css";

function setCode(code, codeBlockId) {
  const pre = document.createElement("pre");
  const formattedCode = code.replace(/ from "[^;]*;/, ' from "importabular";');

  pre.innerText = formattedCode;

  document
    .querySelector('code[data-script="' + codeBlockId + '"]')
    .appendChild(pre);
}

import S from "!!raw-loader!./samples/simple.js";
setCode(S, "simple");

import "./samples/simple";

import WC from "!!raw-loader!./samples/with-checks.js";
setCode(WC, "with-checks");

import "./samples/with-checks";
