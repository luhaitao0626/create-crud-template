let fs = require('fs');
const path = require('path');
let ejs = require('ejs');
let createTemplate = require('./template/entity-element-plus/indexVue');
const options = require('../crud.config');
const target = path.resolve(__dirname,'template/entity-element-plus','indexVue.ejs');

fs.readFile(target, (err, data) => {
    if(err) throw Error(err);
    let template = data.toString();
    let output = ejs.render(template, options);
    fs.writeFileSync(`../dist/index-${Date.now()}.vue`, output)

});
// let template = createTemplate(options);


