import { reactive, ref } from "vue";
import { getEntitys, create, remove, update } from "./crud";
import { total } from './pagination';
import { params } from "./query";
import { columns } from './columns';
import { ElMessage } from 'element-plus'

export let tableData: any = ref([]);

// flag: identify is creating a new data now
const isCreating = ref(false);

// Table
const _columns = columns.filter(column => column.prop != 'id');
export const tableHeader = reactive(_columns);

// getlist
export const setEntitys = async () => {
    let entitys = await getEntitys(params.value);
    tableData.value = entitys.list;
    total.value = entitys.total;
};

// create a new line in table to operate
export const initiateCreate = () => {
    if (isCreating.value) return ElMessage({
        message: 'Warning, you have already in creating mode. Please finish first',
        type: 'warning',
    })
    isCreating.value = true;
    const newData = {
        editable: true,
        isCreating: true,
    }
    tableData.value.unshift(newData)
}

// cancelCreate
export const cancelCreate = async () => {
    isCreating.value = false;
    tableData.value.shift();
}

// create/confirm create
export const handleCreate = async (index: any, row: any) => {
    // call create api (user defined)
    let res = await create(row)

    // re-get entity list after create new data
    await setEntitys();

    isCreating.value = false;
    row.isCreating = undefined;
    row.editable = false;
};

// edit/update
export const handleEdit = async (index: any, row: any) => {
    // call update api (user defined)
    let res = await update(row);
    row.editable = false;
};

// delete
export const handleDelete = async (index: any, row: any) => {
    let res = await remove(row.id);
    setEntitys();
};

// show detail
export const handleDetail = (index: any, row: any) => { };