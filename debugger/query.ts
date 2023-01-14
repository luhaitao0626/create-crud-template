import { reactive, computed } from 'vue';
import { setEntitys } from '.';
const isEmpty = (target: string) => {
  return target === '';
};
export const form = reactive({});
export const params = computed(() => {
  let obj: any = {};
  if (!isEmpty(form.name)) obj.name = form.name;
  if (!isEmpty(form.phone)) obj.phone = form.phone;
  if (!isEmpty(form.email)) obj.email = form.email;
  return obj;
});
export const search = async () => {
  setEntitys();
};
export const reset = async () => {
  clearSearchForm();
  setEntitys();
};
export const clearSearchForm = () => {
  form.name = '';
  form.phone = '';
  form.email = '';
};