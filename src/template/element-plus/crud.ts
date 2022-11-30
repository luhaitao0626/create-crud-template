import type { I<%=entityInitial%> } from './typings/entity';
import type { I<%=entityInitial%>Query } from './typings/entityQuery';
import MockData from './mock-data';

const Fields:string[] = [
    <% fieldNames.forEach(fieldName=>{ %>
        '<%=fieldName%>',
    <%})%>
];

// interface FilterFields<T, U> {
//     (data: T, fields: U): T;
// }

// export const filterFields: FilterFields<I<%=entityInitial%>, typeof Fields> = (data, fields) => {
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

export const get<%=entityInitial%>s = async (params: I<%=entityInitial%>Query): Promise<any> => {
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
export const update = async (<%=entity%>: I<%=entityInitial%>): Promise<any> => {
    let _<%=entity%> = filterFields(<%=entity%>, Fields);
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


