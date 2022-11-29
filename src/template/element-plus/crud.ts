import type { UserQuery } from '@/typings/user';
import * as types from '@/stores/action-types';
import { useUserStore } from "@/stores/user";
import pinia from "@/stores/index";
import type { UserInfo } from './typings/user';

const userStore = useUserStore(pinia);

// enum Fileds {
//     id = 'id',
//     name = 'name',
//     phone = 'phone',
//     gender = 'gender',
//     email = 'email',
//     address = 'address',
// }

const Fields = ['id', 'username', 'gender', 'email', 'address', 'birthday'];

// interface FilterFields<T, U> {
//     (data: T, fields: U): T;
// }

// export const filterFields: FilterFields<UserInfo, typeof Fields> = (data, fields) => {
export const filterFields = (data: any, fields: string[]) => {
    const _data = Object.keys(data)
        .filter((key) => fields.includes(key))
        .reduce((obj, key) => {
            return Object.assign(obj, {
                [key]: data[key]
            })
        }, {})
    return _data;
}

export const getUsers = async (params: UserQuery): Promise<any> => {
    try {
        let _data;
        if(params) {
            let { data } = await userStore[types.GET_USERS](params);
            _data = data;
        }else{
            let { data } = await userStore[types.GET_USERS]();
            _data = data;
        }
        return _data;
    } catch (e) {
        // 优雅降级为本地Mock数据
        console.log(e);
        return e
    }
}
export const update = async (user: UserInfo): Promise<any> => {
    let _user = filterFields(user, Fields);
    try {
        let res = await userStore[types.UPDATE_USER](_user);
    }
    catch (e) {
        return e
    }
}
export const remove = async (id: string): Promise<any> => {
    try {
        let res = await userStore[types.DELETE_USER](id);
    }
    catch (e) {
        return e
    }
}


