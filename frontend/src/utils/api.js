import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const getServices = () => api.get('/services/');
export const getServiceDetail = (id) => api.get(`/services/${id}/`);

// Team API
export const getTeam = () => api.get('/team/');

// Blog API
export const getBlogCategories = () => api.get('/blog/categories/');
export const getBlogPosts = (page = 1, category = null) => {
  const params = { page };
  if (category) params.category = category;
  return api.get('/blog/posts/', { params });
};
export const getBlogPostDetail = (slug) => api.get(`/blog/posts/${slug}/`);

// Testimonials API
export const getTestimonials = () => api.get('/testimonials/');
export const submitTestimonial = (formData) => {
  return api.post('/testimonials/submit/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Gallery API
export const getGallery = (category = null) => {
  const params = category ? { category } : {};
  return api.get('/gallery/', { params });
};

// Contact API
export const submitContact = (data) => api.post('/contact/', data);

// Settings API
export const getSiteSettings = () => api.get('/settings/');

export default api;



