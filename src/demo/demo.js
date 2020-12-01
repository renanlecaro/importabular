import "./demo.css";

import "./samples/main-demo";

function setCode(code, codeBlockId) {
  const pre=document.createElement('pre')
  pre.innerText =code
    .replace('from "../..', 'from "importabular')

  document.querySelector('code[data-script="' + codeBlockId + '"]').appendChild(pre)
}

import "./samples/minimal";
import MINI from "raw-loader!./samples/minimal.js";
setCode(MINI, "minimal");

import "./samples/editor-css";
import ECSS from "raw-loader!./samples/editor-css.js";
setCode(ECSS, "editor-css");

import "./samples/2-editors";
import TE from "raw-loader!./samples/2-editors.js";
setCode(TE, "2-editors");

import "./samples/simple-subclass";
import SS from "raw-loader!./samples/simple-subclass.js";
setCode(SS, "simple-subclass");

import "./samples/editor-full";
import EF from "raw-loader!./samples/editor-full.js";
setCode(EF, "editor-full");

import "./samples/editor-with-headers";
import EWH from "raw-loader!./samples/editor-with-headers.js";
import {doc} from "prettier";
setCode(EWH, "editor-with-headers");
