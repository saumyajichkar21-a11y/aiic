import API from './axios';

export const getTeam = () => API.get('/team');
export const getMember = (id) => API.get(`/team/${id}`);
export const addMember = (data) => API.post('/team', data);
export const updateMember = (id, data) => API.put(`/team/${id}`, data);
export const deleteMember = (id) => API.delete(`/team/${id}`);
