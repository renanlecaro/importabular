
import Importabular from '../src'
import './demo.css'
new Importabular({
  data:[
    ['Product ID','Product name', 'Price','Unit','Category'],
    ['256','Sample product', '2.5','Piece','Stuffs'],
    ['122','Pre mix drink', '5','Bottle','Drinks'],
  ],
  node:document.getElementById('editorNode'),
  maxWidth:5,
  minHeight:8
})