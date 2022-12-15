const fs = require('fs');

const isFile=(path)=>{
    stats=fs.statSync(path);
    return stats.isFile();
}
const isDirectory=(path)=>{
    stats=fs.statSync(path);
    return stats.isDirectory();
}

const getConfigFiles = (path) => {
    let files = fs.readdirSync(path);
    return files.filter(file=>{
        if(isFile(file) && file.endsWith('.config.js')){
            return true
        }
    });
};

const getPwd = ()=>{
    return process.cwd()
}

module.exports = {
    getConfigFiles,
    getPwd
}