import { getUsers, remove, update } from "./crud";
import { total } from './pagination';
import { reactive, ref } from "vue";
import { params } from "./query";
import type { UserQuery, UserInfo } from "@/typings/user";
import { useUserStore } from '@/stores/user';
import { useRouter } from "vue-router";
import * as types from '@/stores/action-types';
import pinia from "@/stores/index";

const userStore = useUserStore(pinia);

const router = useRouter();

export let tableData: any = ref([]);

export const setUsers = async () => {
    let users = await getUsers(params.value);
    tableData.value = users.list;
    total.value = users.total;
}

export const tableDefinition = [
    {
        prop: "username",
        label: "用户名",
        editable: false,
        type: "input",
    },
    {
        prop: "phone",
        label: "手机号",
        editable: false,
        type: "input",
    },
    {
        prop: "gender",
        label: "性别",
        editable: false,
        type: "input",
    },
    {
        prop: "email",
        label: "电子邮件",
        editable: false,
        type: "input",
    },
    {
        prop: "address",
        label: "地址",
        editable: false,
        type: "input",
    },
    {
        prop: "birthday",
        label: "生日",
        editable: false,
        type: "datepicker",
    },
];


// Table
export const tableHeader = reactive(tableDefinition);

export const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: UserInfo;
    rowIndex: number;
}) => {
    // if (rowIndex === 1) {
    //     return "warning-row";
    // } else if (rowIndex === 3) {
    //     return "success-row";
    // }
    return "";
};



export const handleEdit = async (index: any, row: any) => {
  let res = await update(row);
  console.log('res', res);
  row.editable = false;
}

export const handleDelete = async (index: any, row: any) => {
  let res = await remove(row.id);
  setUsers();
};

// show detail
export const handleDetail = (index: any, row: any) => {
  userStore[types.SET_SELECTED_USER](row);
  router.push(`/user/detail/${row.id}`);
};