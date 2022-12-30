import { ref, reactive } from 'vue';
import { setUsers } from '.';

export const total = ref(0);

export const pagination = reactive({
    pageNum: 1,
    pageSize: 5,
});

export const resetPagination = () => {
    pagination.pageNum = 1;
    pagination.pageSize = 5;
}

export const handleSizeChange = (val: number) => {
    pagination.pageSize = val;
    setUsers();
}
export const handleCurrentChange = (val: number) => {
    pagination.pageNum = val;
    setUsers();
}