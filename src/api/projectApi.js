import API from './axios';

export const getProjects = (status) => API.get(status ? `/projects?status=${status}` : '/projects');
export const getProject = (id) => API.get(`/projects/${id}`);
export const addProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
