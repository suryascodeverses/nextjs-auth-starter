import axios, { AxiosInstance, AxiosError } from 'axios';

// Get configuration from environment variables
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API || '';
const USE_DUMMY_DATA = process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BACKEND_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper function to construct API URL
export const getApiUrl = (route: string): string => {
  // If using Next.js API routes (no backend API configured)
  if (!BACKEND_API) {
    return route.startsWith('/api') ? route : `/api${route}`;
  }
  // If using external backend API
  return `${BACKEND_API}${route}`;
};

// Check if we should use dummy data
export const shouldUseDummyData = (): boolean => {
  return USE_DUMMY_DATA;
};

// Export configuration
export const apiConfig = {
  baseURL: BACKEND_API,
  useDummyData: USE_DUMMY_DATA,
};

export default apiClient;
