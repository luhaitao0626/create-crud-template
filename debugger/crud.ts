import type { IEntity } from './typings/entity';
import type { IEntityQuery } from './typings/entityQuery';
import MockData from './mockData';
const Fields: string[] = [];

// interface FilterFields<T, U> {
//     (data: T, fields: U): T;
// }

// export const filterFields: FilterFields<IEntity, typeof Fields> = (data, fields) => {
export const filterFields = (data: any, fields: string[]) => {
  const _data = Object.keys(data).filter(key => fields.includes(key)).reduce((obj, key) => {
    return Object.assign(obj, {
      [key]: data[key]
    });
  }, {});
  return _data;
};
export const getEntitys = async (params: IEntityQuery): Promise<any> => {
  try {
    return MockData;
  } catch (e) {
    console.log(e);
    return e;
  }
};
export const update = async (entity: IEntity): Promise<any> => {
  let _entity = filterFields(entity, Fields);
  try {
    // update api
  } catch (err) {
    return err;
  }
};
export const remove = async (id: string): Promise<any> => {
  try {
    // remove api
  } catch (err) {
    return err;
  }
};