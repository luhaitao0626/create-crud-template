/**
 * 
 */
class Module{
    constructor(filepath, root = undefined){
        this.mid = parseId(filepath);
        this.filepath = this.filepath;
        this.fileType = this.getFileType(filepath);
        if(root) this.root= root;
        this.source = this.getsource();
        this.deps = [];
    }
    // TODO
    parseId(filepath){
        return './vue';
    }
    // TODO
    getFileType(filepath){
        return ""
    }
    // TODO
    getsource(){
        return fs.readFileSync(this.filepath)
    }
}
module.exports = Module;