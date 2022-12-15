const fileList = require('./fileList');

const isNeedQuery = (queryFields) => {
    if (queryFields) {
        if(Array.isArray(queryFields) ){
            if(queryFields.length > 0){
                return true;
            }else{
                return false;
            }
        }
    } else {
        return false
    }
}

let parser = function (options) {
    // entity有哪些字段?
    let fields = options.fields;
    // 是否需要paginiation?
    let needPagination = options.pagination;
    // 是否需要query?
    let needQuery = isNeedQuery(options.queryFields)
    // 需要哪些CRUD操作?
    let operations = options.operations;
    
    let filesNeeded = fileList.filter()

    parseFile(filesNeeded)

    emitFiles()
    return {

    }
}

function emitFiles(){
    createDir
    files => 输出到文件夹下
} 