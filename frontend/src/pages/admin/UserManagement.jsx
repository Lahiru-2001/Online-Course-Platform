import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Search,
  Pencil,
  Trash2,
  UserCheck,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import { useAuth } from "../../context/AuthContext";

import {
  getAllUsers,
  registerInstructor,
  updateUserStatus,
  deleteUser,
} from "../../services/adminService";


export default function UserManagement() {
  const { token } = useAuth();

  const location = useLocation();

  const [selectedRole, setSelectedRole] = useState(
    location.state?.role || "All"
  );

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");



  const [showInstructorModal, setShowInstructorModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const studentCount = users.filter(
    (user) => user.userType === "Student"
  ).length;

  const instructorCount = users.filter(
    (user) => user.userType === "Instructor"
  ).length;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const resetForm = () => {

    setFormData({

      fullName: "",

      email: "",

      password: "",

      confirmPassword: "",

    });

    setErrors({});

  };


  const validateForm = () => {

    const newErrors = {};

    if (!formData.fullName.trim()) {

      newErrors.fullName = "Full name is required.";

    }

    if (!formData.email.trim()) {

      newErrors.email = "Email is required.";

    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (
      formData.email &&
      !emailRegex.test(formData.email)
    ) {

      newErrors.email = "Invalid email address.";

    }

    if (!formData.password) {

      newErrors.password = "Password is required.";

    }

    if (formData.password.length < 6) {

      newErrors.password =
        "Password must be at least 6 characters.";

    }

    if (!formData.confirmPassword) {

      newErrors.confirmPassword =
        "Confirm Password is required.";

    }

    if (
      formData.password !== formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        "Passwords do not match.";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers();

      setUsers(data.users || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {

    if (token) {

      loadUsers();

    }

  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const data = await registerInstructor(formData);

      alert(
        data.message || "Instructor created successfully."
      );

      resetForm();

      setShowInstructorModal(false);

      loadUsers();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        const message = error.response.data.message;

        if (message.toLowerCase().includes("email")) {
          setErrors({
            email: message,
          });
        } else {
          alert(message);
        }
      } else {
        alert("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (user) => {
    try {
      const newStatus =
        user.status === "Active"
          ? "Inactive"
          : "Active";

      await updateUserStatus(user._id, newStatus);

      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to update user status.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);

      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole =
      selectedRole === "All" ||
      u.userType === selectedRole;

    const matchesStatus =
      selectedStatus === "All" ||
      u.status === selectedStatus;

    const matchesSearch =
      u.fullName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      u.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return (
      matchesRole &&
      matchesStatus &&
      matchesSearch
    );
  });

  return (
    <div className="flex flex-col gap-6 bg-gray-50/50 min-h-screen">
      {/* Header and top stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a5f]">User Management</h1>
          {/* <p className="text-xs text-gray-400">Oversee system roles, manage permissions, and track platform activity across Sri Lanka.</p> */}
        </div>

        <div className="flex gap-4 w-full sm:w-auto justify-end">
          <Card className="flex items-center gap-3 border border-gray-200 py-2 px-4 rounded-xl shrink-0">
            <div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Total Active Users</span>
              <h4 className="text-sm font-black text-gray-800 mt-0.5">
                {activeUsers}
              </h4>
            </div>
            {/* <span className="text-[9px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded-full shrink-0">+2%</span> */}
          </Card>
          <Card className="flex items-center gap-3 border border-gray-200 py-2 px-4 rounded-xl shrink-0">
            <div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Total Inactive Users</span>
              <h4 className="text-sm font-black text-gray-800 mt-0.5">
                {inactiveUsers}
              </h4>
            </div>
            {/* <span className="text-[9px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded-full shrink-0">-1.2%</span> */}
          </Card>
        </div>
      </div>

      {/* Filter toolbar matching Screenshot 11 */}
      <Card className="border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs outline-none bg-white focus:border-orange-500"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-200 text-xs rounded-lg bg-gray-50 text-gray-700 font-bold outline-none cursor-pointer"
          >
            <option value="All">User Role</option>
            <option>Student</option>
            <option>Instructor</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-200 text-xs rounded-lg bg-gray-50 text-gray-700 font-bold outline-none cursor-pointer"
          >
            <option value="All">Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <Button
          variant="primary"
          onClick={() => {

            resetForm();

            setShowInstructorModal(true);

          }}
          className="py-2 px-5 text-xs font-bold uppercase tracking-wider shrink-0 w-full md:w-auto"
        >
          Add New Instructor
        </Button>
      </Card>

      {/* User registry table */}
      <Card className="border border-gray-200/80 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-bold uppercase">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (

                <tr key={user._id} className="hover:bg-gray-50/50">

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.fullName
                        )}&background=FC772A&color=fff`}
                        alt={user.fullName}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">{user.fullName}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded uppercase ${user.userType === 'Student'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : user.userType === 'Instructor'
                        ? 'bg-orange-50 text-orange-700 border border-orange-200'
                        : 'bg-gray-50 text-gray-700 border border-gray-200'
                      }`}>
                      {user.userType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>{user.status}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => handleStatusChange(user)}
                        className={`p-2 rounded border transition ${user.status === "Active"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
                          : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          }`}
                        title={
                          user.status === "Active"
                            ? "Deactivate User"
                            : "Activate User"
                        }
                      >
                        <UserCheck size={16} />
                      </button>

                      {/* <button
                        className="p-2 rounded border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white"
                        title="Edit User"
                      >
                        <Pencil size={16} />
                      </button> */}

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 rounded border border-red-200 text-red-600 hover:bg-red-600 hover:text-white"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-semibold">
          <span>Showing {filteredUsers.length} of {totalUsers} users</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50">1</button>
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-550 hover:bg-gray-50">2</button>
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-550 hover:bg-gray-50">3</button>
            <span className="px-1.5 py-1">...</span>
            <button className="px-2 py-1 rounded border border-gray-200 text-gray-550 hover:bg-gray-50">126</button>
          </div>
        </div>
      </Card>

      {showInstructorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

            {/* Header */}

            <div className="flex items-center justify-between border-b px-6 py-4">

              <div>
                <h2 className="text-xl font-bold text-[#1e3a5f]">
                  Add New Instructor
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Create a new instructor account.
                </p>

              </div>

              <button
                onClick={() => {

                  resetForm();

                  setShowInstructorModal(false);

                }}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={22} />
              </button>

            </div>

            {/* Body */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Full Name */}

              {/* Full Name */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition
      ${errors.fullName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500"
                    }`}
                  placeholder="Enter full name"
                />

                {errors.fullName && (

                  <p className="text-red-500 text-sm mt-1">

                    {errors.fullName}

                  </p>

                )}

              </div>

              {/* Email */}

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Email Address

                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition
      ${errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500"
                    }`}
                  placeholder="Enter email address"
                />

                {errors.email && (

                  <p className="text-red-500 text-sm mt-1">

                    {errors.email}

                  </p>

                )}

              </div>

              {/* Password */}

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Password

                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 pr-12 outline-none transition
      ${errors.password
                        ? "border-red-500"
                        : "border-gray-300 focus:border-orange-500"
                      }`}
                    placeholder="Minimum 6 characters"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? (

                      <EyeOff size={18} />

                    ) : (

                      <Eye size={18} />

                    )}
                  </button>

                </div>

                {errors.password && (

                  <p className="text-red-500 text-sm mt-1">

                    {errors.password}

                  </p>

                )}

              </div>

              {/* Confirm Password */}

              {/* Confirm Password */}

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Confirm Password

                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition
      ${errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500"
                    }`}
                  placeholder="Confirm password"
                />

                {errors.confirmPassword && (

                  <p className="text-red-500 text-sm mt-1">

                    {errors.confirmPassword}

                  </p>

                )}

              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-2">

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {

                    resetForm();

                    setShowInstructorModal(false);

                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                >

                  {loading
                    ? "Creating..."
                    : "Create Instructor"}

                </Button>
              </div>

            </form>

          </div>

        </div>
      )}
    </div>
  );
}
