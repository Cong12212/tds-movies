import { API_CONFIG } from '../config/constants';

export const getImageUrl = (path, size = 'MEDIUM') => {
  if (!path) return null;
  return `${API_CONFIG.IMAGE_BASE_URL}/${API_CONFIG.POSTER_SIZES[size]}${path}`;
};

export const formatYear = (dateString) => {
  return dateString ? new Date(dateString).getFullYear() : 'Release date unknown';
};

export const formatDate = (dateString) => {
  return dateString ? new Date(dateString).toLocaleDateString() : 'Unknown';
};