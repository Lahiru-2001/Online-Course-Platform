import api from "./api";

// Get All Users
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// Get Single User
export const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);
  return response.data;
};

// Update User Status
export const updateUserStatus = async (id, status) => {
  const response = await api.patch(`/admin/users/${id}/status`, {
    status,
  });

  return response.data;
};

// Delete User
export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

// Register Instructor
export const registerInstructor = async (formData) => {
  const response = await api.post(
    "/auth/register-instructor",
    formData
  );

  return response.data;
};

// Get Admin Payment Dashboard
export const getAdminPayments = async () => {
  const response = await api.get("/admin/payments");
  return response.data;
};

// Export Payment Report (Optional)

export const exportPaymentReport = async () => {
  const response = await api.get("/admin/payments/export", {
    responseType: "blob",
  });

  return response.data;
};