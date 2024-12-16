import toast from "react-hot-toast";
import { create } from "zustand";
import { apiRequest } from "../utils/apiRequest";

export const useUserStore = create((set) => ({
  allUsers: [],
  allUsersLoading: false,

  getAllUsers: async () => {
    set({ allUsersLoading: true });
    try {
      const response = await apiRequest.get("/users/get-all-users");
      set({ allUsers: response.data, allUsersLoading: false });
    } catch (error) {
      set({ allUsersLoading: false });
      console.log(`error from getAllUsers: ${error}`);
      toast.error(`Error from getAllUsers`);
    }
  },

  getAllUsersDetails: async () => {
    set({ allUsersLoading: true });
    try {
      const response = await apiRequest.get("/users/get-all-users-details");
      set({ allUsers: response.data, allUsersLoading: false });
    } catch (error) {
      set({ allUsersLoading: false });
      console.log(`error from getAllUsers: ${error}`);
      toast.error(`Error from getAllUsers: ${error}`);
    }
  },

  updateUserRole: async ({ userId, newRole }) => {
    set({ allUsersLoading: true });
    // console.log(userId, newRole);
    try {
      const response = await apiRequest.patch("/users/change-role", {
        userId,
        newRole,
      });

      set((state) => ({
        allUsers: state.allUsers.map((user) =>
          user.id === userId ? { ...user, role: response.data.role } : user
        ),
        allUsersLoading: false,
      }));
    } catch (error) {
      set({ allUsersLoading: false });
      console.log(`error from updateUserRole: ${error.message}`);
      toast.error(`Error from updateUserRole`);
    }
  },
}));
