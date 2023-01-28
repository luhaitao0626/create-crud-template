import { reactive, computed } from 'vue';
import { pagination, resetPagination } from './pagination';
import { setEntitys } from '.';

const isEmpty = (target: string) => {
    return target === '';
}

export const form = reactive({});

export const params = computed(() => {
    let obj: any = {};
    if(!isEmpty(form.field)) obj.field = form.field;
    obj.pageNum = pagination.pageNum;
    obj.pageSize = pagination.pageSize;
    return obj;
})

export const search = async () => {
    resetPagination();
    setEntitys();
}

export const reset = async () => {
    clearSearchForm();
    resetPagination();
    setEntitys();
}

export const clearSearchForm = () => {
    form.field = '';
}
