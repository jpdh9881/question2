import { debounce as db } from "lodash";

export const debounce = (func) => {
  return db(func, 500);
};

const service = {
  debounce,
};

export default service;