export type ApiKeyStatus = 'active' | 'expired' | 'disabled';

export type ApiKey = {
  id: string;
  name: string;
  maskedKey: string;
  status: ApiKeyStatus;
  expiresAt: string | null;
  createdAt: string;
  lastUsedAt: string | null;
};

export type CreatedApiKey = ApiKey & { fullKey: string };

export type CreateApiKeyDto = {
  name: string;
  expiresInDays: number | null;
};

export type UpdateApiKeyDto = Partial<Pick<ApiKey, 'name' | 'status'>>;

export function maskKey(fullKey: string): string {
  if (fullKey.length <= 8) {
    if (import.meta.env.DEV) {
      console.warn(`maskKey: unexpectedly short key "${fullKey}" (${fullKey.length} chars)`);
    }
    return fullKey;
  }
  return `${fullKey.slice(0, 4)}...${fullKey.slice(-4)}`;
}

export function effectiveStatus(apiKey: ApiKey): ApiKeyStatus {
  if (apiKey.status === 'disabled') return 'disabled';
  if (apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date()) return 'expired';
  return apiKey.status;
}

export function statusLabel(status: ApiKeyStatus): string {
  return status === 'active' ? 'Active' : status === 'expired' ? 'Expired' : 'Disabled';
}
