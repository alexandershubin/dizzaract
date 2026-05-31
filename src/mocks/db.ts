import type { ApiKey, ApiKeyStatus, CreateApiKeyDto, UpdateApiKeyDto } from '@/pages/ApiKeysPage/types';

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function randomKey(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = 'sk_';
  for (let index = 0; index < 32; index += 1) {
    key += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return key;
}

function maskFromFull(fullKey: string): string {
  return `${fullKey.slice(0, 4)}...${fullKey.slice(-4)}`;
}

let nextId = 1;
function makeId(): string {
  const id = `key_${nextId.toString().padStart(4, '0')}`;
  nextId += 1;
  return id;
}

let keys: ApiKey[] = [
  {
    id: makeId(),
    name: 'ai_inference_key',
    maskedKey: 'a162...sNyr',
    status: 'active',
    expiresAt: daysFromNow(29),
    createdAt: '2026-04-20T10:00:00.000Z',
    lastUsedAt: null,
  },
  {
    id: makeId(),
    name: 'model_training_key',
    maskedKey: 'c3d4...edkv',
    status: 'active',
    expiresAt: daysFromNow(27),
    createdAt: '2026-03-31T10:00:00.000Z',
    lastUsedAt: daysAgo(0),
  },
  {
    id: makeId(),
    name: 'vision_model_key',
    maskedKey: 'e5f6...l71x',
    status: 'expired',
    expiresAt: daysAgo(5),
    createdAt: '2026-03-25T10:00:00.000Z',
    lastUsedAt: daysAgo(2),
  },
  {
    id: makeId(),
    name: 'vision_model_key_v1',
    maskedKey: 'g7h8...pJq0',
    status: 'expired',
    expiresAt: daysAgo(20),
    createdAt: '2026-05-03T10:00:00.000Z',
    lastUsedAt: daysAgo(13),
  },
  {
    id: makeId(),
    name: 'language_model_key',
    maskedKey: 'i9j0...rT2u',
    status: 'active',
    expiresAt: daysFromNow(15),
    createdAt: '2026-05-10T10:00:00.000Z',
    lastUsedAt: daysAgo(1),
  },
  {
    id: makeId(),
    name: 'image_model_key',
    maskedKey: 'k1l2...mN3o',
    status: 'active',
    expiresAt: daysFromNow(60),
    createdAt: '2026-05-15T10:00:00.000Z',
    lastUsedAt: daysAgo(3),
  },
];

export const db = {
  list(): ApiKey[] {
    return keys.slice();
  },
  find(id: string): ApiKey | undefined {
    return keys.find((apiKey) => apiKey.id === id);
  },
  create(payload: CreateApiKeyDto): { record: ApiKey; fullKey: string } {
    const fullKey = randomKey();
    const record: ApiKey = {
      id: makeId(),
      name: payload.name,
      maskedKey: maskFromFull(fullKey),
      status: 'active',
      expiresAt: payload.expiresInDays === null ? null : daysFromNow(payload.expiresInDays),
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
    };
    keys = [record, ...keys];
    return { record, fullKey };
  },
  update(id: string, changes: UpdateApiKeyDto): ApiKey | undefined {
    const index = keys.findIndex((apiKey) => apiKey.id === id);
    if (index === -1) return undefined;
    const merged: ApiKey = { ...keys[index], ...changes } as ApiKey;
    keys = [...keys.slice(0, index), merged, ...keys.slice(index + 1)];
    return merged;
  },
  remove(id: string): boolean {
    const beforeCount = keys.length;
    keys = keys.filter((apiKey) => apiKey.id !== id);
    return keys.length < beforeCount;
  },
  reset(): void {
    nextId = 1;
    keys = [];
  },
  seedStatus(id: string, status: ApiKeyStatus): void {
    const index = keys.findIndex((apiKey) => apiKey.id === id);
    if (index === -1) return;
    keys = [...keys.slice(0, index), { ...keys[index], status }, ...keys.slice(index + 1)];
  },
};
