import { reactive, ref } from "vue";
import { getUsers, remove, update } from "./crud";

import { total } from './pagination';

import { params } from "./query";
import { entityDefinition } from './entityDefinition';

export let tableData: any = ref([]);

// Table
export const tableHeader = reactive(entityDefinition);

// getlist
export const setUsers = async () => {
    let users = await getUsers(params.value);
    tableData.value = users.list;
    
    total.value = users.total;
    
}

// edit/update
export const handleEdit = async (index: any, row: any) => {
    let res = await update(row);
    row.editable = false;
}

// delete
export const handleDelete = async (index: any, row: any) => {
    let res = await remove(row.id);
    setUsers();
};

// show detail
export const handleDetail = (index: any, row: any) => {

};