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



npm link时发生错误
---log---
0 verbose cli [
0 verbose cli   'C:\\Program Files\\nodejs\\node.exe',
0 verbose cli   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js',
0 verbose cli   'link'
0 verbose cli ]
1 info using npm@7.24.2
2 info using node@v16.13.1
3 timing npm:load:whichnode Completed in 1ms
4 timing config:load:defaults Completed in 4ms
5 timing config:load:file:C:\Users\Administrator\AppData\Roaming\npm\node_modules\npm\npmrc Completed in 5ms
6 timing config:load:builtin Completed in 5ms
7 timing config:load:cli Completed in 4ms
8 timing config:load:env Completed in 1ms
9 timing config:load:file:E:\work\create-crud-template\.npmrc Completed in 1ms
10 timing config:load:project Completed in 2ms
11 timing config:load:file:C:\Users\Administrator\.npmrc Completed in 2ms
12 timing config:load:user Completed in 3ms
13 timing config:load:file:C:\Users\Administrator\AppData\Roaming\npm\etc\npmrc Completed in 0ms
14 timing config:load:global Completed in 0ms
15 timing config:load:validate Completed in 4ms
16 timing config:load:credentials Completed in 2ms
17 timing config:load:setEnvs Completed in 2ms
18 timing config:load Completed in 27ms
19 timing npm:load:configload Completed in 27ms
20 timing npm:load:setTitle Completed in 1ms
21 timing npm:load:setupLog Completed in 2ms
22 timing config:load:flatten Completed in 11ms
23 timing npm:load:cleanupLog Completed in 8ms
24 timing npm:load:configScope Completed in 0ms
25 timing npm:load:projectScope Completed in 2ms
26 timing npm:load Completed in 58ms
27 timing arborist:ctor Completed in 2ms
28 timing idealTree:init Completed in 28ms
29 timing idealTree:userRequests Completed in 16ms
30 silly idealTree buildDeps
31 silly placeDep ROOT crud@1.3.0 OK for:  want: file:E:/work/create-crud-template
32 timing idealTree:#root Completed in 27ms
33 timing idealTree:node_modules/crud Completed in 0ms
34 timing idealTree:buildDeps Completed in 31ms
35 timing idealTree:fixDepFlags Completed in 2ms
36 timing idealTree Completed in 80ms
37 timing reify:loadTrees Completed in 222ms
38 timing reify:diffTrees Completed in 9ms
39 silly reify mark retired [
39 silly reify   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\crud',
39 silly reify   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\crud',
39 silly reify   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\crud.cmd',
39 silly reify   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\crud.ps1'
39 silly reify ]
40 silly reify moves {
40 silly reify   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\crud': 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\.crud-DT5XwkPZ',
40 silly reify   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\crud': 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\.crud-xBkjTDYp',
40 silly reify   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\crud.cmd': 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\.crud.cmd-3ICyGjPk',
40 silly reify   'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\crud.ps1': 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\.crud.ps1-1Jyp5uUr'
40 silly reify }
41 timing reify:retireShallow Completed in 17ms
42 timing reify:createSparse Completed in 0ms
43 timing reify:loadBundles Completed in 0ms
44 silly audit bulk request { crud: [ '1.3.0' ] }
45 timing reifyNode:node_modules/crud Completed in 72ms
46 timing reify:unpack Completed in 72ms
47 timing reify:unretire Completed in 1ms
48 timing build:queue Completed in 0ms
49 timing build:deps Completed in 1ms
50 timing build:queue Completed in 5ms
51 info run crud@1.3.0 prepare E:/work/create-crud-template husky install
52 info run crud@1.3.0 prepare { code: 1, signal: null }
53 timing reify:rollback:createSparse Completed in 3ms
54 timing reify:rollback:retireShallow Completed in 10ms
55 timing command:link Completed in 524ms
56 verbose stack Error: command failed
56 verbose stack     at ChildProcess.<anonymous> (C:\Users\Administrator\AppData\Roaming\npm\node_modules\npm\node_modules\@npmcli\promise-spawn\index.js:64:27)
56 verbose stack     at ChildProcess.emit (node:events:390:28)
56 verbose stack     at maybeClose (node:internal/child_process:1064:16)
56 verbose stack     at Process.ChildProcess._handle.onexit (node:internal/child_process:301:5)
57 verbose pkgid crud@1.3.0
58 verbose cwd E:\work\create-crud-template
59 verbose Windows_NT 10.0.22000
60 verbose argv "C:\\Program Files\\nodejs\\node.exe" "C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js" "link"
61 verbose node v16.13.1
62 verbose npm  v7.24.2
63 error code 1
64 error path E:\work\create-crud-template
65 error command failed
66 error command C:\Windows\system32\cmd.exe /d /s /c husky install
67 error 'husky' �����ڲ����ⲿ���Ҳ���ǿ����еĳ���
67 error ���������ļ���
68 verbose exit 1

---------
```

解决方法：
全局安装hucky
npm install husky -g