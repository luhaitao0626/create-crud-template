## 存在的问题
1. 如何将template拆分出去，作为插件使用
作为peerDependency引入各个template or 就将template放到lib/template目录下
2. (√) output时，创建目录，写入文件的逻辑有待提高
3. (√) 输出时，已经创建的目录已存在，报错
4. (√) 需要用在用户的目录下创建输出文件
5. (√)目前使用的是ejs模板的方式，后面需要使用抽象语法树分析的方式来创建模板
6. (√)将各个步骤拆分出去，越细越好，方便以后添加新功能

- 考虑plugin的嵌入方法
- 需要产生一个依赖图，根据配置修改依赖图，然后traverse修改最后生成代码
- template放在哪里好？

## 还未处理的element-plus文件
- crud  [export const getEntitys = async (params: IEntityQuery): Promise<any> => {]
- mock-data 
- query






# 说明

## 占位符
- $I_ENTITY$ is initial capital Entity name;
- $ENTITY$ is lowercase entity name;

## crud-template流程
npm install crud-template -g

### 默认生成
create-crud-template --default

### 创建模板生成
获取默认的config文件，或者自己根据模板写一个xxx.config.cjs
create-crud-template init --filename xxx.config.cjs

用户修改config文件后保存，再通过下面的命令来根据config生成用户所需要的代码
create-crud-template create
就会在当前目录下根据用户的配置文件生成对应的文件，并将文件按结构保存到当前目录下


## TODO
- 如果当前工作目录的config.cjs不止一个，需要用户选择用哪一个config.cjs




## 另一个想法
首先loader 
=> 收集依赖， 
=> treeShaking(需要scope来找) 
=> 根据options 来剔除依赖 
=> 根据剔除的依赖修改使用了该依赖的代码并修改 
=> 最终ast 
=> 生成输出目录 
=> codegen


## TODO
- 实现create功能
- fields 加入id标识
- mockData使用mock.js生成模拟数据
- zh,en多语言转换
- theme切换
