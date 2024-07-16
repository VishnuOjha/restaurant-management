import { Api } from "./Api";


export const uploadImage = async (data, token) => {
  try {
    const response = await Api.post("admin/products/uploadImage", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createOrUpdateRestaurant = async (url, data, token) => {
  try {
    const response = await Api.post(url, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

//for admin
export const getAllProducts = async (token) => {
  try {
    const response = await Api.get("/admin/products/productsList");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

//for user
export const getProductsList = async () => {
  try {
    const response = await Api.get("/users/productsList");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const deleteProduct = async (data, token) => {
  try {
    const response = await Api.post(`/admin/products/deleteProduct`, data);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
