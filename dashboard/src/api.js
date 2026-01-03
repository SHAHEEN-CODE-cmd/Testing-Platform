import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:4000/api" });

export const createTeacher = (payload) => api.post("/teachers", payload);
export const getTeachers = () => api.get("/teachers");

export const createForm = (payload) => api.post("/forms", payload);
export const getForms = () => api.get("/forms");
export const getForm = (id) => api.get(`/forms/${id}`);

export const submitAnswers = (payload) => api.post("/submissions", payload);
export const getFormSubmissions = (formId) => api.get(`/submissions/form/${formId}`);

export default api;
