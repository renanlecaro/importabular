# importabular

Lightweight spreadsheet editor for the web, to easily let your users import their data from excel.

-   Lightweight (under 5kb gzipped) 
-   Mobile friendly
-   Copy / paste
-   MIT License

## Simple sheet

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



## Importer with columns and validation

You can use this more advanced class by importing its file.
It behaves mostly the same as the sheet component but adds columns headers
and validation of the data entered

```javascript
import ImportabularWithHeaders from 'importabular/withHeaders'
const sheet=new ImportabularWithHeaders({
  node:document.getElementById('editorNode'),
  columns:[
    {
      label: "Column 1",
      placeholder: "Value to show if cell is empty",
      title: "Tooltip content for the header",
    },
    {
      label: "Column 2",
    }
  ],
  checks: function(data) {
    // Tooltip per cell    
    const titles = data.map(([col1, col2]) => [
        col1 ? "" : "This column is required",
        col2.length> 10  ? "" : "Max ten chars here",
      ]);
      // Classname of cells
      const classNames = data.map(([col1, col2]) => [
        col1? 'valid':'invalid',
        col2.length>10? 'invalid':'valid' 
      ]);
    
      return { titles, classNames };
  }

})
```
