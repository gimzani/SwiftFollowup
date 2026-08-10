# DATA-GRID

Grid and pager for showing large data sets.

### Components

* DataGrid
* DataPager

## DataGrid

The DataGrid just displays data - it offers no filtering. If paired with a pager it is up to the developer to provide the filtered data or to get data from an api and update the **items** value. Similarly, there is no sorting - but there are events that allow the developer to apply sorting however they desire.

Header and Row items are slotted for templating.

**Props:**

Prop | type | description |
|----|----|----|
| headers | array | array of { label, tag } objects that define the table headers |
| items | array | array of objects that define the items |
| @row-selected | event | returns the row selected |
| @col-selected | event | returns the col selected |

## Usage

The DataGrid requires an array of headers:

```js
const headers = [
  { label: "Id", tag: "id", field: "id" },
  { label: "First Name", tag: "first_name" },
  { label: "Last Name", tag: "last_name" },
  { label: "Email Address", tag: "email" }
]
```

Label and tag are required. Field is optional.

Use "tag" to target the template for the given data:

```html

<template #header-[tag]>
  <div>custom header html</div>
</template>

<template #body-[tag]>
  <div>custom body html</div>
</template>

```

## DataPager

Uses a 'pagerState' object to keep track of how data is paged.

**Example**:

```js
{ page: 1, pageSize: 10, total: 1000 }
```

**Props:**

Prop | type | description |
|----|----|----|
| items | array | array of objects that define the items |
| page-size | number | number of items per page |
| total | number | total items |
| show-paging | boolean | show the pager button controls |
| show-range | boolean | show the range of page |
| @changed | event | returns the pagerState object |
