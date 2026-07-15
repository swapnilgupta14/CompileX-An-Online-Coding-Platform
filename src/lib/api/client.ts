import axios from "axios";

/**
 * Shared axios instance. Base URL and timeout live here so every caller
 * behaves the same. Add interceptors in one place.
 */
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});
