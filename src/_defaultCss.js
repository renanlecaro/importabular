export const _defaultCss = `
html{
  overflow: auto;
}
*{
  box-sizing: border-box;
}
iframe{
  position:absolute;
}
body{
  padding: 0; 
  margin: 0;
}
table{
  border-spacing: 0;
  background: white;
  border: 1px solid #ddd;
  border-width: 0 1px 1px 0;
  font-size: 16px;
  font-family: sans-serif;
  border-collapse: separate;
  min-width:100%;
}
td, th{
  padding:0;
  border: 1px solid;
  border-color: #ddd transparent transparent #ddd; 
}
td.selected.multi:not(.editing){
  background:#d7f2f9;
} 
td.focus:not(.editing){
  border-color: #13ac59;
} 
td>*, th>*{
  border:none;
  padding:10px;
  min-width:10px;
  min-height: 40px;
  font:inherit;
  line-height: 20px;
  color:inherit;
  white-space: normal;
}
td>div::selection {
    color: none;
    background: none;
}

.placeholder div{
  user-select:none;
  color:rgba(0,0,0,0.2);
}
*[title] div{cursor:help;}
th{text-align:left;}
`;
