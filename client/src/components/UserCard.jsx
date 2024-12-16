/* eslint-disable react/prop-types */

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";

const UserCard = ({ firstName, lastName, role, country, email, id }) => {
  const { user } = useAuthStore();
  const { updateUserRole } = useUserStore();
  const [newRole, setNewRole] = useState("");

  const handleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleRoleChange = (e) => {
    e.preventDefault();
    // console.log("new role " + newRole + " user id: " + id);
    if (!newRole) {
      toast.error("Please select a new role.");
      return;
    }
    updateUserRole({ userId: id, newRole: newRole });
    setNewRole("");
  };

  const roles = ["cool kid", "cooler kid", "coolest kid"];
  return (
    <div
      className={`${
        id === user.id ? "w-1/2" : "w-full"
      }  mx-auto bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden transform transition hover:scale-105`}
    >
      <div className="p-6">
        {/* Full Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {firstName} {lastName}
        </h2>

        {/* Role */}
        {role && (
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-semibold">Role: </span> {role}
          </p>
        )}

        {/* Country */}
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">Country: </span> {country}
        </p>

        {/* Email */}
        {email && (
          <p className="text-gray-600 text-sm mb-4 break-all">
            <span className="font-semibold">Email: </span> {email}
          </p>
        )}

        {user.role === "maintainer" ? (
          <form className="space-y-4">
            {/* Label for Select Dropdown */}
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Change Role
            </label>

            {/* Select Dropdown */}
            <select
              id="role"
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 transition"
              onClick={handleRoleChange}
            >
              Update Role
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default UserCard;
