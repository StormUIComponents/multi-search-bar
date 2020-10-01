# Multi Search Bar

## Overview
The Multi Search Bar allows let you switch between basic and advanced search. Both searches will 
let user to select a type from a dropdown list.

[CHANGELOG.md](CHANGELOG.md) contains Release Notes for this package.

[CONTRIBUTING.md](CONTRIBUTING.md) contains guidelines on how to help improve this package.

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
              advancedSearchAttributes={FORM_CONFIG}
              handleSelectedChange={this.onSelectedChange}
              messages={MESSAGES}/>
```
Property Name | Type | Required | Description | Default
------------- | ---- | -------- | ----------- | -------
handleSearch |Function | NO | when Search button is clicked | N/A
options | Array | NO | dropdown list fields, if not available, dropdown will be hidden. if empty array, still we see it | N/A
allowBlankBasicSearch | Boolean|NO| If you set to true, if the textbox is empty still can search | false
advancedSearchAttributes | Obj | NO | for form, if not available, there won't be advanced search button | N/A
handleSelectedChange |Function|NO| when dropdown is changed, this will trigger| N/A
defaultSearch| string | NO| the search which will be shown when opening the page (BASIC,ADVANCED) | BASIC
basicSearch| boolean | NO | you can specify false if you do not want to have basic search at all | true
advancedSearch | boolean | NO | You can specify false if you do not want advanced search at all | true
messages | Obj | NO | Language specific verbiage displayed by the controls in this component | See below

Property Name | Type | Required | Description | Default
------------- | ---- | -------- | ----------- | -------
basicSearchLabel | string | Yes | Basic/Advanced toggle: Basic | Basic 
advancedSearchLabel | string | Yes | Basic/Advanced toggle: Advanced | Advanced 
noAttrText | string | Yes | Display when advanced search has no form inputs defined | No searchable attributes for selected entity types
searchLabel | string | Yes | Search button text | Search 
searchPlaceholder | string | Yes | Search input placeholder | Search... 
selectSomeItems | string | Yes | Options Placeholder: when no items are selected | Select Some Items... 
allItemsAreSelected | string | Yes | Options Placeholder: when all items are no selected | All Items Are Selected 
selectAll | string | Yes | Option to select all options | Select All 
search | string | Yes | Options search placeholder | Search 

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
  breakpoints: { 350: 1, 750: 2, 900: 3 }
}
```

Example of messages:
```
{
  basicSearchLabel: "Basic",
  advancedSearchLabel: "Advanced",
  noAttrText: "No searchable attributes for selected entity types",
  searchLabel: "Search",
  searchPlaceholder: "Search...",
  selectSomeItems: "Select Some Items...",
  allItemsAreSelected: "All Items Are Selected",
  selectAll: "Select All",
  search: "Search",
}
```