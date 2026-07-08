import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get all published courses
export const getCourses = () => API.get("/courses");

// Get one course
export const getCourseById = (id) => API.get(`/courses/${id}`);


// Get all ratings of a course
export const getCourseRatings = (courseId) =>
  API.get(`/courses/${courseId}/ratings`);

// Add or update a rating
export const addCourseRating = (courseId, data) =>
  API.post(`/courses/${courseId}/rating`, data);



// Create course
export const createCourse = (formData) =>
  API.post("/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// Enroll in a course
export const enrollCourse = (courseId) =>
  API.post(`/enrollments/${courseId}`);

// Get all enrolled courses
export const getMyCourses = () =>
  API.get("/enrollments/my");

// Get single enrollment
export const getEnrollment = (courseId) =>
  API.get(`/enrollments/course/${courseId}`);

// Get completed course details
export const getCompletedCourse = (courseId) =>
  API.get(`/enrollments/course/${courseId}/completed`);

// Update learning progress
export const updateProgress = (courseId, data) =>
  API.put(`/enrollments/progress/${courseId}`, data);

export default API;