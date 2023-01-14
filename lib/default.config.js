const path = require('path');

const config = {
  entity: "entity",
  type: 'element-plus',
  output: path.resolve(__dirname),
  editable: true,
  hasPagination: false,
  fields: {
    name: {
      prop: String,
      type: "input",
      label: "entity",
      required: true,
      editable: true,
      query: true,
    },
    age: {
      prop: Number,
      type: "input",
      label: "entity",
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
      query: true,
    },
    gender: {
      prop: String,
      type: "radio",
      label: "gender",
      required: true,
      editable: true,
      query: true,
    },
    phone: {
      prop: String,
      type: "input",
      label: "phone",
      required: true,
      editable: true,
      query: true,
    },
    email: {
      prop: String,
      type: "input",
      label: "email",
      required: false,
      editable: true,
      query: true,
    },
    address: {
      prop: String,
      type: "input",
      label: "address",
      required: false,
      editable: true,
      query: true,
    },
    birthday: {
      prop: String,
      type: "datetime",
      label: "birthday",
      required: false,
      editable: true,
      query: true,
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
