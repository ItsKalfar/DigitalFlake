import axios from "axios";
import { getFromLocalStorage } from "../../utils/LocalStorage";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  function (config) {
    const token = getFromLocalStorage("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export const loginUser = (data: { email: string; password: string }) => {
  return apiClient.post("/users/login", data);
};

export const registerUser = (data: { email: string; password: string }) => {
  return apiClient.post("/users/register", data);
};

export const logoutUser = () => {
  return apiClient.post("/users/logout");
};

export const getCategories = () => {
  return apiClient.post("/categories/getCategories");
};

export const getProducts = () => {
  return apiClient.post("/products/getProducts");
};

export const createCategory = (data: ICategories) => {
  return apiClient.post("/categories/addCategory", data);
};

export const createProduct = (data: IProducts) => {
  return apiClient.post("/products/addProduct", data);
};

export const deleteCategory = () => {
  return apiClient.delete("/categories/deleteCategory");
};

export const deleteProduct = () => {
  return apiClient.delete("/products/deleteProduct");
};
