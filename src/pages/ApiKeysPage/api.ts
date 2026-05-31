import { apiClient } from '@/shared/lib/apiClient';
import type { ApiKey, CreateApiKeyDto, CreatedApiKey, UpdateApiKeyDto } from './types';

export async function fetchApiKeys(): Promise<ApiKey[]> {
  const response = await apiClient.get<ApiKey[]>('/keys');
  return response.data;
}

export async function createApiKey(payload: CreateApiKeyDto): Promise<CreatedApiKey> {
  const response = await apiClient.post<CreatedApiKey>('/keys', payload);
  return response.data;
}

export async function updateApiKey(id: string, changes: UpdateApiKeyDto): Promise<ApiKey> {
  const response = await apiClient.patch<ApiKey>(`/keys/${id}`, changes);
  return response.data;
}

export async function deleteApiKey(id: string): Promise<void> {
  await apiClient.delete(`/keys/${id}`);
}
