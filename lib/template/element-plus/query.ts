import { reactive, computed } from 'vue';
<% if(hasPagination){ %>
import { pagination, resetPagination } from './pagination';
<% } %>
import { set<%=entityInitial%>s } from '.';

<%if(hasQuery){%>
const isEmpty = (target: string) => {
    return target === '';
}
<%}%>

export const form = reactive({
    <% queryFields.forEach(field=>{ %>
        <%= field%> : '',
    <% })%>
});

export const params = computed(() => {
    let obj: any = {};
    <%if(hasQuery){%>
        <% queryFields.forEach(field=> {%>
            if (!isEmpty(form.<%=field%>)) obj.<%=field%> = form.<%=field%>;
        <%})%>
    <%}%>
    <%if(hasPagination){%>
    obj.pageNum = pagination.pageNum;
    obj.pageSize = pagination.pageSize;
    <%}%>

    <%if(hasQuery || hasPagination){%>
    return obj;
    <% } else {%>
    return null
    <%}%>
})

export const search = async () => {
    <%if(hasPagination){%>
    resetPagination();
    <%}%>
    set<%=entityInitial%>s();
}

export const reset = async () => {
    clearSearchForm();
    <%if(hasPagination){%>
    resetPagination();
    <%}%>
    set<%=entityInitial%>s();
}

export const clearSearchForm = () => {
    <% queryFields.forEach(field=> {%>
        form.<%=field%> = ''
    <%})%>
}
