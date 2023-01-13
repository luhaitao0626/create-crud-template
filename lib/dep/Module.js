class Module{
    constructor(name){
        this.name = name;
        this.deps = new Set;
    }
    addDep(dep){
        if(!dep.has(dep)){
            this.deps.add(deps)
        }
    }
    removeDep(dep){
        if(dep.has(dep)){
            this.deps.delete(deps)
        }
    }
}