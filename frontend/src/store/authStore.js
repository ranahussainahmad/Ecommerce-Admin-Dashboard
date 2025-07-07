import { axiosInstance } from '../libs/axios.js';
import { create } from 'zustand';

export const authstore = create((set, get) => ({
    authUser: null,
    isLoading: false,

    // Check if user is already logged in (on app start)
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            // You can add a route to check current user status
            // For now, we'll rely on the stored auth state
            set({ isLoading: false });
        } catch (error) {
            console.error("Auth check failed:", error);
            set({ authUser: null, isLoading: false });
        }
    },

    signup: async (user) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.post('/users/signup', user);
            set({ authUser: res.data, isLoading: false });
            return true;
        } catch (error) {
            console.error("Signup failed:", error);
            set({ authUser: null, isLoading: false });
            return false;
        }
    },

    login: async (credentials) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.post('/users/login', credentials);
            
            set({ authUser: res.data, isLoading: false });
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            set({ authUser: null, isLoading: false });
            return false;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await axiosInstance.post('/users/logout');
            set({ authUser: null, isLoading: false });
        } catch (error) {
            console.error("Logout failed:", error);
            set({ authUser: null, isLoading: false });
        }
    },
}));
