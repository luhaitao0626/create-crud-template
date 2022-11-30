import { reactive, ref } from "vue";
import { get<%=entityInitial%>s, remove, update } from "./crud";
<%if(hasPagination){%>
import { total } from './pagination';
<%}%>
import { params } from "./query";
import { entityDefinition } from './entityDefinition';

export let tableData: any = ref([]);

// Table
export const tableHeader = reactive(entityDefinition);

// getlist
export const set<%=entityInitial%>s = async () => {
    let <%=entity%>s = await get<%=entityInitial%>s(params.value);
    tableData.value = <%=entity%>s.list;
    <%if(hasPagination){%>
    total.value = <%=entity%>s.total;
    <%}%>
}

// edit/update
export const handleEdit = async (index: any, row: any) => {
    let res = await update(row);
    row.editable = false;
}

// delete
export const handleDelete = async (index: any, row: any) => {
    let res = await remove(row.id);
    set<%=entityInitial%>s();
};

// show detail
export const handleDetail = (index: any, row: any) => {

};