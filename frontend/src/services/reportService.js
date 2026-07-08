import api from "./api";

// Get Administrator Report
export const getAdminReport = async () => {
  try {
    const { data } = await api.get("/reports/admin");
    return data;
  } catch (error) {
    console.error("Admin Report Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Unable to load admin report.",
      }
    );
  }
};

// Get Instructor Report

export const getInstructorReport = async () => {
  try {
    const { data } = await api.get("/reports/instructor");
    return data;
  } catch (error) {
    console.error("Instructor Report Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Unable to load instructor report.",
      }
    );
  }
};

// Get Report Based On User Role

export const getReport = async (role) => {
  if (role === "Administrator") {
    return getAdminReport();
  }

  if (role === "Instructor") {
    return getInstructorReport();
  }

  throw {
    success: false,
    message: "Unauthorized user role.",
  };
};