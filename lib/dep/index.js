const Module = require("./Module");

const entry = new Module("@/index.vue");
const index = new Module("@/index.ts");
const query = new Module("@/query.ts");
const pagination = new Module("@/pagination.ts");
const crud = new Module("@/crud.ts");
// the following module are pure module, which means not depend on other modules
const entityDefinition = new Module("@/entityDefinition.ts");
const mockData = new Module("@/mockData.ts");
const typingEntity = new Module("@/typingEntity");
const typingEntityQuery = new Module("@/typingEntityQuery");


entry.addDep(index);
entry.addDep(query);
entry.addDep(pagination);

index.addDep(crud);
index.addDep(pagination)
index.addDep(query)
index.addDep(entityDefinition)

query.addDep(pagination)
query.addDep(index)

pagination.addDep(index);

crud.addDep(mockData);
crud.addDep(typingEntity)
crud.addDep(typingEntityQuery)



module.exports = dependency;
