import apiClient, { shouldUseDummyData, getApiUrl } from './api-client';
import { dummyApi } from './dummy-data';
import { AxiosError } from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token?: string;
}

export interface RegisterResponse {
  success: boolean;
  user: User;
}

export interface MeResponse {
  user: User;
}

const handleApiError = (error: unknown): never => {
  if (error instanceof Error) throw error;
  const axiosError = error as AxiosError<{ error?: string; message?: string }>;
  const message = axiosError.response?.data?.error || axiosError.response?.data?.message || axiosError.message || 'An error occurred';
  const err = new Error(message) as Error & { status?: number };
  err.status = axiosError.response?.status;
  throw err;
};

export const apiService = {
  register: async (data: { name: string; email: string; password: string; }): Promise<RegisterResponse> => {
    try {
      if (shouldUseDummyData()) {
        console.log('🔧 Using dummy data for registration');
        return await dummyApi.register(data);
      }
      const response = await apiClient.post<RegisterResponse>(getApiUrl('/auth/register'), data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  login: async (data: { email: string; password: string; }): Promise<LoginResponse> => {
    try {
      if (shouldUseDummyData()) {
        console.log('🔧 Using dummy data for login');
        return await dummyApi.login(data);
      }
      const response = await apiClient.post<LoginResponse>(getApiUrl('/auth/login'), data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  logout: async (): Promise<{ success: boolean }> => {
    try {
      if (shouldUseDummyData()) {
        console.log('🔧 Using dummy data for logout');
        return await dummyApi.logout();
      }
      const response = await apiClient.post<{ success: boolean }>(getApiUrl('/auth/logout'));
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  me: async (): Promise<MeResponse> => {
    try {
      if (shouldUseDummyData()) {
        console.log('🔧 Using dummy data for current user');
        return await dummyApi.me();
      }
      const response = await apiClient.get<MeResponse>(getApiUrl('/auth/me'));
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export const { register, login, logout, me } = apiService;
