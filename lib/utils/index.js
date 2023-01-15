const fs = require('fs');
const path = require('path');

const isFile = (path) => {
    stats = fs.statSync(path);
    return stats.isFile();
}
const isDirectory = (path) => {
    if (fs.existsSync(path)) {
        stats = fs.statSync(path);
        return stats.isDirectory();
    } else {
        return false
    }
}

const removeFile = (_path) => {
    fs.unlinkSync(_path)
}

const removeDir = (_path) => {
    const files = fs.readdirSync(_path);
    files.forEach(filename => {
        const filedir = path.join(_path, filename)
        const stats = fs.statSync(filedir);
        const isFile = stats.isFile();
        const isDir = stats.isDirectory();
        if (isFile) {
            removeFile(filedir)
            // console.log(`file: ${filedir} removed`)
        }
        if (isDir) {
            removeDir(filedir)
            // console.log(`dir: ${filedir} removed`)
        }
    });
    fs.rmSync(_path, { recursive: true })
}

const getConfigFiles = (path) => {
    let files = fs.readdirSync(path);
    return files.filter(file => {
        if (isFile(file) && file.endsWith('.config.cjs')) {
            return true
        }
    });
};

const getCwd = () => {
    return process.cwd()
}

module.exports = {
    getConfigFiles,
    getCwd,
    isDirectory,
    isFile,
    removeDir,
}