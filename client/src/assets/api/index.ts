import axios from "axios";

const token = "sagar";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

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
  return apiClient.post("/categories");
};

export const getProducts = () => {
  return apiClient.post("/categories");
};

export const createCategory = (data: ICategories) => {
  return apiClient.post("/categories/create", data);
};

export const createProduct = (data: IProducts) => {
  return apiClient.post("/products/create", data);
};
