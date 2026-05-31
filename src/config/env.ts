export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  enableMocks: (import.meta.env.VITE_ENABLE_MOCKS ?? (import.meta.env.DEV ? 'true' : 'false')) === 'true',
  isDev: import.meta.env.DEV,
};
