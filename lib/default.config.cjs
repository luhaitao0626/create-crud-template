const path = require("path");

const config = {
  type: "element-plus",
  output: path.resolve(__dirname),
  editable: true,
  hasPagination: true,
  fields: {
    id: {
      prop: String,
      type: 'input',
      label: 'id',
      required: true,
      editable: false,
      query: false,
    },
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
  }
};
module.exports = config;
