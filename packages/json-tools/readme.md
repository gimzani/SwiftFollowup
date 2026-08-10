# JSON TOOLS

JSON tools is a set of several components used to read, load, edit and export JSON data.

| Component | description |
|----|----|
| JsonEditor | An JSON editor that makes use of <a href="https://codemirror.net/" target="_blank">Code Mirror</a> |
| JsonDownload | A Button that takes JSON data and packages it into a downloadable file |
| JsonUpload | A Button that uses the browser file select to upload JSON data |
| JsonSaveLocal | A Button that saves JSON data to localStorage |
| JsonLoadLocal | A Button that reads JSON data from localStorage |


## JsonEditor

Renders an editor for JSON data.

Prop | type | description |
|----|----|----|
| v-model | JSON | the JSON data |
| readOnly | boolean | show but do not allow editing |
| expanded | boolean | expand all collapsed nodes |

```js
import { JsonEditor } from '@sf/json-tools';
```
```xml
<JsonEditor v-model="jsonData"></JsonEditor>
```

## JsonDownload

Renders a button that downloads JSON data - also has a content slot.

Prop | type | description |
|----|----|----|
| data | JSON | the JSON data |
| label | string | the button label text |
| fileName | string | the name of the JSON file to be saved |

```js
import { JsonDownload } from '@sf/json-tools';
```
```xml
<JsonDownload 
  :data="jsonData"
>
  <i class="fa-solid fa-download"></i> Download JSON File
</JsonDownload>
```


## JsonUpload

Renders a button that uploads JSON data - also has a content slot.

Prop | type | description |
|----|----|----|
| data | JSON | the JSON data |
| label | string | the button label text |
| @uploaded | :string | returns the JSON data that was uploaded |

```js
import { JsonDownload } from '@sf/json-tools';
```
```xml
<JsonUpload 
  :data="jsonData"
  @uploaded="jsonUploaded"
>
  <i class="fa-solid fa-upload"></i> Upload JSON File
</JsonUpload>
```

## JsonSaveLocal

Renders a button that saves JSON data to localStorage - also has a content slot.

Prop | type | description |
|----|----|----|
| data | JSON | the JSON data |
| label | string | the button label text |
| keyName | string | the key used to save data to localStorage |
| @saved | null | returns when the JSON data is saved |

```js
import { JsonSaveLocal } from '@sf/json-tools';
```
```xml
<JsonSaveLocal 
  :key-name="keyName"
  :data="jsonData"
>
  <i class="fa-solid fa-floppy-disk"></i> Save JSON Data
</JsonSaveLocal>
```

## JsonLoadLocal

Renders a button that loads JSON data from localStorage - also has a content slot.

Prop | type | description |
|----|----|----|
| label | string | the button label text |
| keyName | string | the key used to save data to localStorage |
| @loaded | :object | returns when the JSON data is saved |

```js
import { JsonLoadLocal } from '@sf/json-tools';
```
```xml
<JsonLoadLocal 
  :key-name="keyName"
  :data="jsonData"
>
  <i class="fa-solid fa-floppy-disk"></i> Save JSON Data
</JsonLoadLocal>
```