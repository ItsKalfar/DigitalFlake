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
  return apiClient.get("/categories/get_all_categories");
};

export const getProducts = () => {
  return apiClient.get("/products/get_all_products");
};

export const addCategory = (data: ICategories) => {
  return apiClient.post("/categories/add_category", data);
};

export const addProduct = (data: IProducts) => {
  return apiClient.post("/products/add_product", data);
};

export const deleteCategory = (data: string) => {
  return apiClient.delete("/categories/delete_category", { data });
};

export const deleteProduct = (data: string) => {
  return apiClient.delete("/products/delete_product", { data });
};
