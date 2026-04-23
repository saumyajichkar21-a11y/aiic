import API from './axios';

export const getGallery = (category) => API.get(category ? `/gallery?category=${category}` : '/gallery');
export const addGalleryItem = (data) => API.post('/gallery', data);
export const updateGalleryItem = (id, data) => API.put(`/gallery/${id}`, data);
export const deleteGalleryItem = (id) => API.delete(`/gallery/${id}`);
