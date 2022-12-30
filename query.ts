import { reactive, computed } from 'vue';

import { pagination, resetPagination } from './pagination';

import { setUsers } from '.';


const isEmpty = (target: string) => {
    return target === '';
}


export const form = reactive({
    
        username : '',
    
        phone : '',
    
        email : '',
    
});

export const params = computed(() => {
    let obj: any = {};
    
        
            if (!isEmpty(form.username)) obj.username = form.username;
        
            if (!isEmpty(form.phone)) obj.phone = form.phone;
        
            if (!isEmpty(form.email)) obj.email = form.email;
        
    
    
    obj.pageNum = pagination.pageNum;
    obj.pageSize = pagination.pageSize;
    

    
    return obj;
    
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
    
        form.username = ''
    
        form.phone = ''
    
        form.email = ''
    
}
