import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";


export const productStore = create((set, get) => ({
    products: [],
    addProducts: async (product) => {
        const res = await axiosInstance.post('/products/addproducts', product);
        if (res.status === 201) {
            set((state) => {
                return { products: [...state.products, res.data] }
            })
            return true
        } else {
            console.error("Failed to add product:", res.statusText);
            return false;
        }
    },
    getAllProducts: async () => {
        const res = await axiosInstance.get('/products');
        if (res.status === 200) {
            set({ products: res.data });
            return true;
        } else {
            console.error("Failed to fetch products:", res.statusText);
            return false;
        }
    },
    getProductById: async (id) => {
        const res = await axiosInstance.get(`/products/${id}`);
        if (res.status === 200) {
            return res.data;
        } else {
            console.error("Failed to fetch product:", res.statusText);
            return null;
        }
    },
    deleteProduct: async (id) => {
        const res = await axiosInstance.delete(`/products/removeproducts/${id}`);
        if (res.status === 200) {
            set((state) => ({
                products: state.products.filter(product => product._id !== id)
            }));
            return true;
        } else {
            console.error("Failed to delete product:", res.statusText);
            return false;
        }
    },

    updateProduct: async (id, updatedData) => {
        const res = await axiosInstance.put(`/products/updateproducts/${id}`, updatedData);
        if (res.status === 200) {
            set((state) => ({
                products: state.products.map(p => p._id === id ? res.data : p)
            }));
            return true;
        } else {
            console.error("Failed to update product:", res.statusText);
            return false;
        }
    }

}));
