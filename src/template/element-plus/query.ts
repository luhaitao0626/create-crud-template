import { isEmpty } from '@/utils/utils';
import { reactive, computed } from 'vue';
<%if(pagination)%>
import { pagination, resetPagination } from './pagination';
<%}%>
import { setUsers } from '.';
import { hasPagination } from '../../../crud.config';

// TODO:这里需要queryFields动态生成
export const form = reactive({
    username: '',
    phone: '',
});

export const params = computed(() => {
    let obj: any = {};
    <%if(hasQuery)%>
    // TODO:这里需要queryFields动态生成
    if (!isEmpty(form.username)) obj.username = form.username;
    if (!isEmpty(form.phone)) obj.phone = form.username;
    <%}%>
    <%if(hasPagination)%>
    obj.pageNum = pagination.pageNum;
    obj.pageSize = pagination.pageSize;
    <%}%>

    <%if(hasQuery || hasPagination)%>
    return obj;
    <% else {%>
    return null
    <%?%>
})

export const search = async () => {
    resetPagination();
    setUsers();
}

export const reset = async () => {
    clearSearchForm();
    resetPagination();
    setUsers();
}

export const clearSearchForm = () => {
    form.username = '';
    form.phone = '';
}
