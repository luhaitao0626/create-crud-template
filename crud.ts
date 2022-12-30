import type { IUser } from './typings/entity';
import type { IUserQuery } from './typings/entityQuery';
import MockData from './mock-data';

const Fields:string[] = [
    
        'username',
    
        'gender',
    
        'phone',
    
        'email',
    
        'address',
    
        'birthday',
    
];

// interface FilterFields<T, U> {
//     (data: T, fields: U): T;
// }

// export const filterFields: FilterFields<IUser, typeof Fields> = (data, fields) => {
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

export const getUsers = async (params: IUserQuery): Promise<any> => {
    try {
        let _data;
        if(params) { // with query params
            _data = MockData;
        }else{ // with query params that is get all list
            _data = MockData;
        }
        return _data;
    } catch (e) {
        console.log(e);
        return e
    }
}
export const update = async (user: IUser): Promise<any> => {
    let _user = filterFields(user, Fields);
    try {
        // update api
    }
    catch (e) {
        return e
    }
}
export const remove = async (id: string): Promise<any> => {
    try {
        // remove api
    }
    catch (e) {
        return e
    }
}


