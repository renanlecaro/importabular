# importabular
Lightweight spreadsheet editor for the web, to easily let your users import their data from excel.

*   Under 5 Kb
*   Mobile friendly
*   Copy / paste
*   MIT License

## Usage

Install with `npm i importabular`

Then create an instance like this 

```javascript
import Importabular from 'importabular'
const sheet=new Importabular({
  node:document.getElementById('editorNode'),
})
```


Get the current data as a 2D array
```javascript
sheet.data.toArr()
```


Destroy it to remove event listeners
```javascript
sheet.destroy()
```

## Limitations

This is a minimalist library that does very little :

*   No sharing of the keyboard with other components on the page
*   No virtual rendering
*   No sorting, pivot, formula, etc ..
*   Only basic keyboard shortcuts
*   Only strings as data type
*   Only for recent browsers

## More complete example

Some common use cases have options, for the rest you should just read [the source](https://github.com/renanlecaro/importabular) and subclass it of fix the code.

```javascript

import Importabular from 'importabular'

const sheet=new Importabular({
  node:document.getElementById('editorNode'),

  // Prefill the table
  data:[['This','is','the','first','row']],

  // Called after each change to the table data
  onChange:data=>console.log('new data : ',data),

  // Called every time the user changes selection,
  // useful for real time collaborative editing
  onSelectionChange:sel=>console.log('new selection',sel),

  // Each cell is rendered as a TD with inside either
  // a div or an input. This will override the TD style
  cellStyle:(x,y,{selected,editing})=>
    ({
      backgroundColor:!selected && !editing && y%2?
        '#fafafa':null
    }),

  // and this will override the style of the text
  // input or div.
  contentStyle:()=>({fontFamily:'sherif'}),

  // Starting size of the grid on instanciation
  minWidth:5,
  minHeight:10,

  // Limits to the growth of the grid
  maxWidth:5,
  maxHeight:10,
})
```

## More info
 
I've created this lib because I was tired of having to remove 90% of the features offered by the very few open source libs for web spreadsheets.

So for this reinventing the wheel to make sense, I should not add any extra features to this core. The lib is fresh and not battle tested, so probably has some bugs. Feel free to [create an issue](https://github.com/renanlecaro/importabular/issues/new) if you find a clear bug, or submit a PR.

The source is still quite tiny (600 lines of code) so you shouldn't have too hard of a time modifying it to fit your needs.

