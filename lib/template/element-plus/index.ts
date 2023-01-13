import { reactive, ref } from "vue";
import { getEntitys, remove, update } from "./crud";
import { total } from './pagination';
import { params } from "./query";
import { entityDefinition } from './entityDefinition';

export let tableData: any = ref(entityDefinition);

// Table
export const tableHeader = reactive(entityDefinition);

// getlist
export const setEntitys = async () => {
    let entitys = await getEntitys(params.value);
    tableData.value = entitys.list;
    total.value = entitys.total;
}

// edit/update
export const handleEdit = async (index: any, row: any) => {
    let res = await update(row);
    row.editable = false;
}

// delete
export const handleDelete = async (index: any, row: any) => {
    let res = await remove(row.id);
    setEntitys();
};

// show detail
export const handleDetail = (index: any, row: any) => {

};