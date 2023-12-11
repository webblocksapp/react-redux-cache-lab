import axios from 'axios';

export const LOCAL_BASE_URL = 'localhost:3001';

/**
 * Pre-configured axios instance with COBRA CMP API base url.
 */
export const axiosCobraCmp = axios.create({
  baseURL: LOCAL_BASE_URL,
});
