# importabular

Lightweight spreadsheet editor for the web, to easily let your users import their data from excel.

-   Lightweight (under 5kb gzipped) 
-   Mobile friendly
-   Copy / paste
-   MIT License


# Quickstart

The quick and dirty way :

```
<div id="editor"/>
<script src="https://cdn.jsdelivr.net/npm/importabular"></script>
<script>
const sheet = new Importabular({
  node: document.getElementById("editor"),
  columns: [
    {
      label: "Contact name",
    },
    {
      label: "Phone number",
    },
    {
      label: "Email address",
    },
  ],
});
</script>
```
# Demo and doc

The website will give you more details : https://importabular.lecaro.me/

NPM : https://www.npmjs.com/package/importabular

![Screenshot of the demo website](./src/demo/screenshot.jpg)
