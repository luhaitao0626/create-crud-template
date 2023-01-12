# create-crud-template
This cli is used for creating CRUD template of various UI libraries, emelent-plus, ant-design, vant and so on.  
The Main Purpose is to free developers from manually creating entity CRUD files.

## instruction
Until now, crud-cli only support element-plus CRUD template, other template will be available later.

## how to use?
1. install
```
npm install create-crud-template --save-dev
```
2. initialize
```
crud-cli init
```
This command will create a default.config.js file in the cwd(current working directory).   
If you want to customize entity name, try the following command.
```
crud-cli init [entity]
```
Thus will create a [entity].config.js in the cwd. Modify the config file to setup the entity configuration you want to create.

3. create
use the following command to create crud template based on the config file in the cwd. If there are multiple config files in cwd, when you run `crud-cli create`, commander line will allow you to choose from the file list to assign certain config file.

4. continue

5. 测试commitzen