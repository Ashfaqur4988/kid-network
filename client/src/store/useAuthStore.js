import { create } from "zustand";
import toast from "react-hot-toast";
import { apiRequest } from "../utils/apiRequest";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signup: async ({ email, password }) => {
    set({ loading: true });
    try {
      const response = await apiRequest.post("/auth/register", {
        email,
        password,
      });
      set({ user: response.data, loading: false });
      toast.success("Signup successful");
    } catch (error) {
      set({ loading: false });
      console.log(`error from signup: ${error}`);
      toast.error(`Error from signup`);
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const response = await apiRequest.post("/auth/login", {
        email,
        password,
      });
      // console.log(response.data);
      set({ user: response.data, loading: false });
      toast.success("Login successful");
    } catch (error) {
      set({ loading: false });
      console.log(`error from login: ${error}`);
      toast.error(`Error from login`);
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await apiRequest.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logout successful");
    } catch (error) {
      set({ loading: false });
      console.log(`error from logout: ${error}`);
      toast.error(`Error from logout`);
    }
  },

  getLoggedInUser: async () => {
    set({ checkingAuth: true });
    try {
      const response = await apiRequest.get("/auth/get-logged-in-user");
      // console.log(response.data);
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false });
      console.log(`error from getLoggedInUser: ${error}`);
    }
  },
}));
