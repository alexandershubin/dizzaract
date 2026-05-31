import axios, { AxiosError, type AxiosInstance } from 'axios';
import { env } from '@/config/env';

export type ApiErrorShape = {
  status: number;
  message: string;
  details?: unknown;
};

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(shape: ApiErrorShape) {
    super(shape.message);
    this.status = shape.status;
    this.details = shape.details;
    this.name = 'ApiError';
  }
}

function mapAxiosError(error: AxiosError): ApiError {
  const status = error.response?.status ?? 0;
  const data = error.response?.data as { message?: string } | undefined;
  return new ApiError({
    status,
    message: data?.message ?? error.message ?? 'Request failed',
    details: error.response?.data,
  });
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(mapAxiosError(error)),
);
