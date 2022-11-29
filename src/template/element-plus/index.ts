import { getUsers, remove, update } from "./crud";
import { total } from './pagination';
import { reactive, ref } from "vue";
import { params } from "./query";
import type { UserQuery, UserInfo } from "@/typings/user";
import { useUserStore } from '@/stores/user';
import { useRouter } from "vue-router";
import * as types from '@/stores/action-types';
import pinia from "@/stores/index";
import { entityDefinition } from './entityDefinition';

const userStore = useUserStore(pinia);

const router = useRouter();

export let tableData: any = ref([]);

// Table
export const tableHeader = reactive(entityDefinition);

// getlist
export const setUsers = async () => {
    let users = await getUsers(params.value);
    tableData.value = users.list;
    <%if(hasPagination){%>
    total.value = users.total;
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
    setUsers();
};

// show detail
export const handleDetail = (index: any, row: any) => {
    userStore[types.SET_SELECTED_USER](row);
    router.push(`/entity/detail/${row.id}`);
};