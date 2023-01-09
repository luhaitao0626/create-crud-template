const path = require('path');

const config = {
  entity: "entity",
  type: 'element-plus',
  output: path.resolve(__dirname),
  editable: true,
  hasPagination: false,
  // queryFields: ["username", "phone",'email'],
  fields: {
    name: {
      prop: String,
      type: "input",
      label: "entity",
      editable: false,
    },
    gender: {
      prop: String,
      type: "radio",
      label: "gender",
      editable: false,
    },
    phone: {
      prop: String,
      type: "input",
      label: "phone",
      editable: false,
    },
    email: {
      prop: String,
      type: "input",
      label: "email",
      editable: false,
    },
    address: {
      prop: String,
      type: "input",
      label: "address",
      editable: false,
    },
    birthday: {
      prop: String,
      type: "datetime",
      label: "birthday",
      editable: false,
    },
  },
  operations: ["create", "update", "remove", "detail"],
  dependencies: [
    {
      name: "store",
      isNeed: true,
      path: "@/stores",
      aliasName: "userStore",
      actionTypes: {
        isNeed: true,
        path: "@/stores/action-types",
      },
    },
    {
      name: "router",
      isNeed: true,
    },
  ],
};
module.exports = config;
