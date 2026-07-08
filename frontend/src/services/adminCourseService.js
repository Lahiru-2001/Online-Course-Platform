import axios from "axios";

const API = "http://localhost:5000/api/admin/courses";

const token = () => localStorage.getItem("token");

const config = () => ({
    headers: {
        Authorization: `Bearer ${token()}`
    }
});

// Get all courses
export const getCourses = () =>
    axios.get(API, config());

// Get one course
export const getCourse = (id) =>
    axios.get(`${API}/${id}`, config());

// Update
export const updateCourse = (id, data) =>
    axios.put(`${API}/${id}`, data, config());

// Delete
export const deleteCourse = (id) =>
    axios.delete(`${API}/${id}`, config());

// Update status
export const updateStatus = (id, status) =>
    axios.patch(
        `${API}/${id}/status`,
        { status },
        config()
    );

export default {
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    updateStatus,
};