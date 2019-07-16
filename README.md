# Multi Search Bar

## Overview
The Multi Search Bar allows let you switch between basic and advanced search. Both searches will 
let user to select a type from a dropdown list.

## Installation
Run the following NPM command to install:


```
> npm install --save multi-search-bar
````

Run the following NPM command to launch a sample demo:

```
> npm start
```
![Basic Search](/screenshot1.png)
![Advanced Search](/screenshot2.png)

This component is using configurable-form-builder too.


```$xslt
     <MultiSearchBar
              handleSearch={callback}
              options={options}
              allowBlankBasicSearch={true}
              advancedSearchAttributes={FORM_CONFIG}
              handleSelectedChange={this.onSelectedChange}/>
```
Property Name | Type | Required | Description | Default
------------- | ---- | -------- | ----------- | -------
handleSearch |Function | NO | when Search button is clicked | N/A
options | Array | NO | dropdown list fields, if not available, dropdown will be hidden. if empty array, still we see it | N/A
allowBlankBasicSearch | Boolean|NO| If you set to true, if the textbox is empty still can search | false
advancedSearchAttributes | Obj | NO | for form, if not available, there won't be advanced search button | N/A
handleSelectedChange |Function|NO| when dropdown is changed, this will trigger| N/A


Example of form config:
```
{
  title: "Sample Config Form Title",
  fields: [
    {
      id: "id",
      type: "text",
      label: "Name"
    },
    {
      id: "options",
      type: "enum",
      label: "Status",
      values: ["option 1", "option 2", "option 3"]
    },
    {
      id: "non-text-attr",
      type: "long",
      label: "Non-Text Attr"
    }
  ],
  primaryButtonText: "Search",
  noAttrText: "No searchable attributes for selected entity types",
  breakpoints: { 350: 1, 750: 2, 900: 3 }
}
```
