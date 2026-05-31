import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createApiKey, deleteApiKey, fetchApiKeys, updateApiKey } from './api';
import type { ApiKey, CreateApiKeyDto, CreatedApiKey, UpdateApiKeyDto } from './types';

export const apiKeysKeys = {
  all: ['api-keys'] as const,
  list: () => [...apiKeysKeys.all, 'list'] as const,
};

export function useApiKeysQuery() {
  return useQuery({
    queryKey: apiKeysKeys.list(),
    queryFn: fetchApiKeys,
  });
}

export function useCreateApiKeyMutation() {
  const queryClient = useQueryClient();
  return useMutation<CreatedApiKey, Error, CreateApiKeyDto>({
    mutationFn: createApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeysKeys.list() });
    },
  });
}

type UpdateArgs = { id: string; changes: UpdateApiKeyDto };

export function useUpdateApiKeyMutation() {
  const queryClient = useQueryClient();
  return useMutation<ApiKey, Error, UpdateArgs, { previous?: ApiKey[] }>({
    mutationFn: ({ id, changes }) => updateApiKey(id, changes),
    onMutate: async ({ id, changes }) => {
      await queryClient.cancelQueries({ queryKey: apiKeysKeys.list() });
      const previous = queryClient.getQueryData<ApiKey[]>(apiKeysKeys.list());
      if (previous) {
        queryClient.setQueryData<ApiKey[]>(
          apiKeysKeys.list(),
          previous.map((apiKey) => (apiKey.id === id ? { ...apiKey, ...changes } : apiKey)),
        );
      }
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(apiKeysKeys.list(), context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: apiKeysKeys.list() }),
  });
}

export function useDeleteApiKeyMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string, { previous?: ApiKey[] }>({
    mutationFn: deleteApiKey,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: apiKeysKeys.list() });
      const previous = queryClient.getQueryData<ApiKey[]>(apiKeysKeys.list());
      if (previous) {
        queryClient.setQueryData<ApiKey[]>(
          apiKeysKeys.list(),
          previous.filter((apiKey) => apiKey.id !== id),
        );
      }
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(apiKeysKeys.list(), context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: apiKeysKeys.list() }),
  });
}
