import { reactive, computed } from 'vue';
import { pagination, resetPagination } from './pagination';
import { setEntitys } from '.';

const isEmpty = (target: string) => {
    return target === '';
}

export const form = reactive({
    // <% queryFields.forEach(field=>{ %>
    //     <%= field%> : '',
    // <% })%>
});

export const params = computed(() => {
    let obj: any = {};
    // <%if(hasQuery){%>
    //     <% queryFields.forEach(field=> {%>
    //         if (!isEmpty(form.<%=field%>)) obj.<%=field%> = form.<%=field%>;
    //     <%})%>
    // <%}%>
    // <%if(hasPagination){%>
    // obj.pageNum = pagination.pageNum;
    // obj.pageSize = pagination.pageSize;
    // <%}%>

    // <%if(hasQuery || hasPagination){%>
    // return obj;
    // <% } else {%>
    // return null
    // <%}%>
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
    // <% queryFields.forEach(field=> {%>
    //     form.<%=field%> = ''
    // <%})%>
}
