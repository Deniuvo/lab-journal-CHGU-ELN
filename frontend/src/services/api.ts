import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    // Handle server errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/api/auth/login/', credentials),
  logout: () => api.post('/api/auth/logout/'),
};

export const usersAPI = {
  getProfile: () => api.get('/api/users/profile/'),
  updateProfile: (data: any) => api.patch('/api/users/profile/', data),
  changePassword: (data: any) => api.post('/api/users/change-password/', data),
  getUsers: (params?: any) => api.get('/api/users/', { params }),
  getUser: (id: number) => api.get(`/api/users/${id}/`),
  updateUser: (id: number, data: any) => api.patch(`/api/users/${id}/`, data),
  deleteUser: (id: number) => api.delete(`/api/users/${id}/`),
  getUserStats: () => api.get('/api/users/stats/'),
  toggleVerification: (id: number) => api.post(`/api/users/${id}/toggle-verification/`),
  changeRole: (id: number, role: string) => api.post(`/api/users/${id}/change-role/`, { role }),
};

export const experimentsAPI = {
  getExperiments: (params?: any) => api.get('/api/experiments/', { params }),
  getExperiment: (id: number) => api.get(`/api/experiments/${id}/`),
  createExperiment: (data: any) => api.post('/api/experiments/', data),
  updateExperiment: (id: number, data: any) => api.patch(`/api/experiments/${id}/`, data),
  deleteExperiment: (id: number) => api.delete(`/api/experiments/${id}/`),
  getExperimentSteps: (id: number) => api.get(`/api/experiments/${id}/steps/`),
  createExperimentStep: (id: number, data: any) => api.post(`/api/experiments/${id}/steps/`, data),
  updateExperimentStep: (id: number, stepId: number, data: any) =>
    api.patch(`/api/experiments/${id}/steps/${stepId}/`, data),
  deleteExperimentStep: (id: number, stepId: number) =>
    api.delete(`/api/experiments/${id}/steps/${stepId}/`),
  getExperimentComments: (id: number) => api.get(`/api/experiments/${id}/comments/`),
  createExperimentComment: (id: number, data: any) =>
    api.post(`/api/experiments/${id}/comments/`, data),
  getExperimentAttachments: (id: number) => api.get(`/api/experiments/${id}/attachments/`),
  uploadAttachment: (id: number, formData: FormData) =>
    api.post(`/api/experiments/${id}/attachments/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteAttachment: (id: number, attachmentId: number) =>
    api.delete(`/api/experiments/${id}/attachments/${attachmentId}/`),
};

export const protocolsAPI = {
  getProtocols: (params?: any) => api.get('/api/protocols/', { params }),
  getProtocol: (id: number) => api.get(`/api/protocols/${id}/`),
  createProtocol: (data: any) => api.post('/api/protocols/', data),
  updateProtocol: (id: number, data: any) => api.patch(`/api/protocols/${id}/`, data),
  deleteProtocol: (id: number) => api.delete(`/api/protocols/${id}/`),
  getProtocolVersions: (id: number) => api.get(`/api/protocols/${id}/versions/`),
  createProtocolVersion: (id: number, data: any) =>
    api.post(`/api/protocols/${id}/versions/`, data),
};

export const analyticsAPI = {
  getDashboardStats: () => api.get('/api/analytics/dashboard/'),
  getExperimentStats: (params?: any) => api.get('/api/analytics/experiments/', { params }),
  getUserStats: (params?: any) => api.get('/api/analytics/users/', { params }),
  getProtocolStats: (params?: any) => api.get('/api/analytics/protocols/', { params }),
  exportData: (format: string, params?: any) =>
    api.get(`/api/analytics/export/${format}/`, { params, responseType: 'blob' }),
};

export const filesAPI = {
  uploadFile: (formData: FormData) =>
    api.post('/api/files/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getFiles: (params?: any) => api.get('/api/files/', { params }),
  getFile: (id: number) => api.get(`/api/files/${id}/`),
  deleteFile: (id: number) => api.delete(`/api/files/${id}/`),
  searchFiles: (query: string) => api.get('/api/files/search/', { params: { q: query } }),
};

export default api;
