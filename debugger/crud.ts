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
export const create = async (entity: IEntity): Promise<any> => {
  // filter unnecessay properties in entity
  let _entity = filterFields(entity, Fields);
  try {
    // update api (user defined)
    // const res = await createEntity(_entity)
    // return res
  } catch (err) {
    return err;
  }
};
export const update = async (entity: IEntity): Promise<any> => {
  // filter unnecessay properties in entity
  let _entity = filterFields(entity, Fields);
  try {
    // update api (user defined)
    // const res = await updateEntity(_entity)
    // return res
  } catch (err) {
    return err;
  }
};
export const remove = async (id: string): Promise<any> => {
  try {
    // remove api (user defined)
    // const res = await updateEntity(id)
    // return res
  } catch (err) {
    return err;
  }
};