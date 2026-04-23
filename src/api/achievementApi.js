import API from './axios';

export const getAchievements = () => API.get('/achievements');
export const addAchievement = (data) => API.post('/achievements', data);
export const updateAchievement = (id, data) => API.put(`/achievements/${id}`, data);
export const deleteAchievement = (id) => API.delete(`/achievements/${id}`);
