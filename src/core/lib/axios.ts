import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ENV } from '../config/env';
import { useAuthStore } from '../store/auth.store';

const BASE_URL = ENV.API_URL || 'https://api.myappbase.com/v1';

// ✅ Type Safety for Queue
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Large Scale apps often need 30s for slow mobile networks
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- 🛡️ Request Interceptor ---
httpClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().userToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- 🛰️ Concurrency Handling (Queue) ---
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

/**
 * Robust Refresh Token Function
 */
export const refreshAuthToken = async (): Promise<string | null> => {
  try {
    const state = useAuthStore.getState();
    const refreshToken = state.refreshToken;

    if (!refreshToken) {
      state.logout();
      return null;
    }

    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      refreshToken: refreshToken
    }, { timeout: 30000 });

    const resData = response.data;
    const accessToken = resData.data?.accessToken || resData.accessToken;
    const newRefreshToken = resData.data?.refreshToken || resData.refreshToken;

    if (!accessToken) throw new Error("Invalid refresh response");

    state.setTokens(accessToken, newRefreshToken);
    return accessToken;

  } catch (refreshError: any) {
    if (refreshError.response) {
      const status = refreshError.response.status;
      if (status >= 400 && status < 500) {
        console.log(`❌ Token Expired/Invalid (${status}). Logging out.`, refreshError.response.data);
        useAuthStore.getState().logout();
      } else {
        console.log(`🌐 Server error (${status}) during refresh, keeping session alive.`);
        useAuthStore.getState().logout();
      }
    } else {
      console.log('🌐 Refresh failed due to network/server, keeping session alive.', refreshError.message);
    }
    return null;
  }
};

// --- 🛡️ Response Interceptor ---
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest) return Promise.reject(error);

    // ✅ Skip Auth Routes (Login loop protection)
    const isAuthRoute = originalRequest.url?.includes('/auth/');
    if (isAuthRoute) {
      return Promise.reject(error);
    }

    // ✅ Handle 401 Unauthorized (With Queue)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Agar refresh chal raha h, to request ko queue me daalo
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAuthToken();

        if (!newToken) {
          // Refresh fail -> Queue reject -> Logout handled inside refreshAuthToken
          processQueue(new Error("Session Expired"), null);
          return Promise.reject(error);
        }

        // Success -> Update Header & Process Queue
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return httpClient(originalRequest);

      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // ✅ Network Error Handling (Production Safe)
    // Production me Network Error par logout NAHI karna chahiye.
    // User ko "No Internet" toast dikhana UI ka kaam hai, Interceptor ka nahi.
    if (!error.response) {
      console.warn("🌐 Network Error: Please check internet connection.");
      // Error throw karo taaki React Query / UI component "Retry" button dikha sake.
      return Promise.reject(new Error("Network Error: Please check your connection"));
    }

    // ✅ Server Errors (500)
    if (error.response.status >= 500) {
      console.log("🔥 Server Error:", error.response.data);
    }

    return Promise.reject(error);
  }
);
