import API from './axios';

export const submitContact = (data) => API.post('/contact', data);
export const getMessages = () => API.get('/contact');
export const markRead = (id) => API.put(`/contact/${id}/read`);
export const deleteMessage = (id) => API.delete(`/contact/${id}`);
