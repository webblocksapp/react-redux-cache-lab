import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const LOCAL_BASE_URL = 'http://localhost:5173';
export const axiosLocal = axios.create({
  baseURL: LOCAL_BASE_URL,
});

export const axiosLocalBaseQuery =
  ({ baseUrl } = { baseUrl: LOCAL_BASE_URL }) =>
  async ({ url, method, data, params, headers }: AxiosRequestConfig) => {
    try {
      const result = await axiosLocal({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (e) {
      const error = e as AxiosError;
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
