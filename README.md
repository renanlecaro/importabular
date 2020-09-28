# importabular

Lightweight spreadsheet editor for the web, to easily let your users import their data from excel.

-   Lightweight ![Size badge](https://badgen.net/bundlephobia/minzip/importabular)
-   Mobile friendly
-   Copy / paste
-   MIT License

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
sheet.getData()
```

Set the current data from a 2D array

```javascript
sheet.setData([['Content of A1','of A2','A3'], ['B1','B2','etc.']])
```

Destroy it to remove event listeners

```javascript
sheet.destroy()
```

## Limitations

This is a minimalist library that does very little :

-   The API is quite young and subject to changes in later version
-   No virtual rendering, we use a simple size, this has the advantage of automatic column and rows sizing
-   No sorting, pivot, formula, etc ..
-   Only basic keyboard shortcuts
-   Only strings as data type
-   Only for recent browsers
-   No "drag cell corner to duplicate value"
-   Support of right click / copy is there, but not cur or paste via mouse. The keyboard shortcut should work though

## More info

I've created this lib because I was tired of having to remove 90% of the features offered by the very few open source libs for web spreadsheets.

So for this reinventing the wheel to make sense, I should not add any extra features to this core. The lib is fresh and not battle tested, so probably has some bugs. Feel free to [create an issue](https://github.com/renanlecaro/importabular/issues/new) if you find a clear bug, or submit a PR.

The source is still quite tiny (600 lines of code) so you shouldn't have too hard of a time modifying it to fit your needs.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [Importabular](#importabular)
    -   [Parameters](#parameters)
    -   [destroy](#destroy)
    -   [setData](#setdata)
        -   [Parameters](#parameters-1)
    -   [getData](#getdata)

### Importabular

Spreadsheet component

#### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.data` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Initial data of the table, ie \[['A1','A2'],['B1','B2']] (optional, default `[]`)
    -   `options.node` **[Node](https://developer.mozilla.org/docs/Web/API/Node/nextSibling)** Dom node to create the table into (optional, default `null`)
    -   `options.onChange` **[Node](https://developer.mozilla.org/docs/Web/API/Node/nextSibling)** Callback to run whenever the data
                      has changed, receives the new data as an argument. (optional, default `null`)
    -   `options.minRows` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Minimum number of rows. (optional, default `1`)
    -   `options.maxRows` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Maximum number of rows, the table will not grow vertically beyond this. (optional, default `Infinity`)
    -   `options.minCols` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Minimum number of columns. (optional, default `1`)
    -   `options.maxCols` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Maximum number of columns, the table will not grow horizontally beyond this. (optional, default `Infinity`)
    -   `options.css` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Css code to add inside the iframe. (optional, default `""`)
    -   `options.width` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Width of the iframe that will contain the table. (optional, default `"100%"`)
    -   `options.height` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Height of the iframe that will contain the table. (optional, default `"80vh"`)

#### destroy

Destroys the table, and clears even listeners

#### setData

Replace the current data with the provided 2D array.

##### Parameters

-   `data` **\[\[[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)]]** the new data, as a 2D array.

#### getData

Returns the current data as a 2D array

Returns **\[\[[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)]]** data the latest data as a 2D array.
