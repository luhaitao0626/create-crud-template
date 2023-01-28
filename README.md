# create-crud-template
This cli is used for creating CRUD template of various UI libraries, emelent-plus, ant-design, vant and so on.  
The Main Purpose is to free developers from manually creating entity CRUD files.

## instruction
Until now, crud-cli only support element-plus CRUD template, other template will be available later.

## How to use?
### 1. install
```cmd
npm install webcrud-cli -g
```

### 2. initialize
```cmd
crud init <entity>
```
This command will create a file named entity.config.cjs in the current working directory.
Modify the config file to make costumized entity configuration.

### 3. create

The following command will create crud template.
```cmd
crud create
```
If there is only one entity.config.cjs file in current working directory, the cli will create crud template according to this file. However, if there are multiple config.cjs files, there will appear an interfact asking user to select one from the list.

The cli will create a folder named 'entity' then emit template files into it.

## config.cjs description
\<entity\>.config.cjs structure is as following:
```js
const path = require('path');

const config = {
  type: 'element-plus', // UI type: currently only support element-plus
  output: path.resolve(__dirname), // output, current working directoy
  editable: true, // entity table editable or not
  hasPagination: true, // whether need pagination or not
  fields: { // entity properties, is an object
    name: {
      prop: String, // value type of property
      type: "input", // specify element to show the property value 
      label: "entity", // the label of property, used in table header
      required: true, // whether this property is required
      editable: true, // whether this property is editable
      query: true, // whether this property is quariable
    },
    age: {
      prop: Number,
      type: "input",
      label: "age",
      required: true,
      editable: true,
      query: true,
    },
    active: {
      prop: Boolean,
      type: "switch",
      label: "active",
      required: false,
      editable: true,
      query: false,
    },
    gender: {
      prop: String,
      type: "input",
      label: "gender",
      required: true,
      editable: false,
      query: false,
    },
    phone: {
      prop: String,
      type: "input",
      label: "phone",
      required: true,
      editable: true,
      query: false,
    },
    email: {
      prop: String,
      type: "input",
      label: "email",
      required: false,
      editable: true,
      query: false,
    },
    address: {
      prop: String,
      type: "input",
      label: "address",
      required: false,
      editable: true,
      query: false,
    },
    birthday: {
      prop: String,
      type: "datepicker",
      label: "birthday",
      required: false,
      editable: true,
      query: false,
    },
  },
  // operations: ["create", "update", "remove", "detail"],
  // dependencies: [
  //   {
  //     name: "store",
  //     isNeed: true,
  //     path: "@/stores",
  //     aliasName: "userStore",
  //     actionTypes: {
  //       isNeed: true,
  //       path: "@/stores/action-types",
  //     },
  //   },
  //   {
  //     name: "router",
  //     isNeed: true,
  //   },
  // ],
};
module.exports = config;

```