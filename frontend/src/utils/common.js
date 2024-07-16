export const getItemFromStorage = (key) => {
  return localStorage.getItem(key);
};

export const setItemInStorage = (key, data) => {
  return localStorage.setItem(key, data);
};

export const removeItemFromStorage = (key) => {
  localStorage.removeItem(key);
};
