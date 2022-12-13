# create-crud-template
This is a cli for creating crud page of an entity, currently support for vue@next sfc template. Code spliting is automatically done.

## 占位符

- $I_ENTITY$ is initial capital Entity name;
- $ENTITY$ is lowercase entity name;

## 存在的问题
- output时，创建目录，写入文件的逻辑有待提高
- 输出时，已经创建的目录已存在，报错
- 需要用在用户的目录下创建输出文件


## crud-template流程
npm install crud-template -g

### 默认生成
create-crud-template --default

### 创建模板生成
获取默认的config文件，或者自己根据模板写一个xxx.config.js
create-crud-template init --filename xxx.config.js

用户修改config文件后保存，再通过下面的命令来根据config生成用户所需要的代码
create-crud-template create
就会在当前目录下根据用户的配置文件生成对应的文件，并将文件按结构保存到当前目录下


## TODO
- 如果当前工作目录的config.js不止一个，需要用户选择用哪一个config.js