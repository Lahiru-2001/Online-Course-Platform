import api from "./api";

// Instructor Dashboard
export const getInstructorDashboard = async () => {

    const { data } = await api.get(
        "/instructor/dashboard"
    );

    return data;
};

// Instructor Profile
export const getInstructorProfile = async () => {

    const { data } = await api.get(
        "/instructor/profile"
    );

    return data;
};

export const updateInstructorProfile = async (formData) => {

    const { data } = await api.put(
        "/instructor/profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};

// Earnings
export const getInstructorEarnings = async () => {

    const { data } = await api.get(
        "/instructor/earnings"
    );

    return data;
};

// Withdrawal
export const createWithdrawal = async (payload) => {

    const { data } = await api.post(
        "/instructor/withdraw",
        payload
    );

    return data;
};

export const getWithdrawalHistory = async () => {

    const { data } = await api.get(
        "/instructor/withdrawals"
    );

    return data;
};