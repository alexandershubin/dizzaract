import { http, HttpResponse, delay } from 'msw';
import { db } from '@/mocks/db';
import type { CreateApiKeyDto, UpdateApiKeyDto } from '@/pages/ApiKeysPage/types';

const BASE = '/api/keys';

export const apiKeysHandlers = [
  http.get(BASE, async () => {
    await delay(300);
    return HttpResponse.json(db.list());
  }),

  http.post(BASE, async ({ request }) => {
    await delay(400);
    const payload = (await request.json()) as CreateApiKeyDto;
    if (!payload.name || payload.name.trim().length === 0) {
      return HttpResponse.json({ message: 'Name is required' }, { status: 400 });
    }
    const { record, fullKey } = db.create(payload);
    return HttpResponse.json({ ...record, fullKey }, { status: 201 });
  }),

  http.patch(`${BASE}/:id`, async ({ params, request }) => {
    await delay(300);
    const id = params.id as string;
    const changes = (await request.json()) as UpdateApiKeyDto;
    const updated = db.update(id, changes);
    if (!updated) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json(updated);
  }),

  http.delete(`${BASE}/:id`, async ({ params }) => {
    await delay(300);
    const removed = db.remove(params.id as string);
    if (!removed) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return new HttpResponse(null, { status: 204 });
  }),
];
