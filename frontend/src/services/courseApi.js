import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});


// Get all published courses
export const getAllCourses = () => {
    return axios.get(API_URL);
};

// Get single course
export const getCourseById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Get course ratings
export const getCourseRatings = (id) => {
    return axios.get(`${API_URL}/${id}/ratings`);
};

// Add rating
export const addCourseRating = (id, data) => {
    return axios.post(
        `${API_URL}/${id}/rating`,
        data,
        authHeader()
    );
};


// Get logged-in instructor courses
export const getInstructorCourses = () => {
    return axios.get(
        `${API_URL}/instructor/my`,
        authHeader()
    );
};

// Create course
export const createCourse = (formData) => {
    return axios.post(
        API_URL,
        formData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );
};

// Update course
export const updateCourse = (id, data) => {
    return axios.put(
        `${API_URL}/${id}`,
        data,
        authHeader()
    );
};

// Delete course
export const deleteCourse = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        authHeader()
    );
};

export default {
    getAllCourses,
    getCourseById,
    getCourseRatings,
    addCourseRating,
    getInstructorCourses,
    createCourse,
    updateCourse,
    deleteCourse
};