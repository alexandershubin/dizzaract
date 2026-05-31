# API Keys — Test Task

A React + Vite + TypeScript implementation of the API keys management screen from the supplied Figma design. Built so a real backend can replace the mock layer with a single env-var change.

## Stack

- **React 18** + **Vite** + **TypeScript** (strict)
- **Tailwind CSS** + **shadcn-style** Radix primitives
- **React Router v6**
- **TanStack Query v5** + **axios** (with interceptors)
- **MSW v2** — mocks `/api/keys` at the network level
- **React Hook Form** + **zod** — form validation
- **Vitest** + **React Testing Library** — smoke tests

## Setup

```bash
npm install
npm run dev          # http://localhost:5173
npm run test         # run tests once
npm run test:watch   # watch mode
npm run build        # production build
```

Requires Node 18+.

## How the mock backend works

MSW (`Mock Service Worker`) intercepts real `fetch` / XHR calls to `/api/keys` at the Service Worker level. The handlers live in `src/mocks/handlers/apiKeys.ts` and mutate an in-memory store in `src/mocks/db.ts`. From the rest of the app's perspective, this is indistinguishable from a real backend: axios sees real HTTP responses with realistic delays.

### Swapping in a real backend

Three steps:
1. Set `VITE_API_BASE_URL` in `.env.local` to the real base URL (e.g. `https://api.example.com`).
2. Set `VITE_ENABLE_MOCKS=false` (or build for production — mocks are disabled outside `import.meta.env.DEV` by default).
3. Delete `src/mocks/` and the `worker.start()` call in `src/main.tsx` once you're confident the backend matches the contract.

No component, hook, or axios call needs to change. Auth headers and error mapping plug into `src/shared/lib/apiClient.ts` interceptors.

## Architecture notes

```
src/
  app/            Composition root + providers + router
  pages/
    ApiKeysPage/  Feature: types, api.ts (axios), queries.ts (React Query), components/
    ComingSoonPage.tsx   Shared placeholder for non-API-keys routes
  shared/
    ui/           Reusable UI primitives (Button, Dialog, DropdownMenu, …)
    lib/          apiClient, cn, date helpers
    layout/       AppShell, Sidebar, MobileBottomNav, TopBar
  config/         env, constants (nav items, expiry presets), QueryClient defaults
  mocks/          MSW handlers + in-memory db
```

**Data flow:** UI → React Query hook → axios call → MSW handler → in-memory db.
**Responsive:** one breakpoint (`md: 768px`). Desktop renders a table, mobile renders a card list; both are mounted but only one is visible (Tailwind `hidden md:table` / `md:hidden`). No `useMediaQuery`.
**Mutations:** disable / delete use **optimistic updates** via `useMutation.onMutate` + rollback in `onError`.

## What was implemented vs. design

- Full API keys list (desktop table, mobile cards) with hover/tap states.
- Create flow: two-step modal (form → revealed full key with copy + warning), mirroring the OpenAI / Anthropic console UX.
- Disable / enable (toggle) and delete with confirmation.
- Empty state, error state with retry, loading state.
- App shell with sidebar (desktop) and bottom nav (mobile); all non-API-keys routes lead to a shared placeholder.

## Future improvements

- **Edit flow** — `Edit` action is a toast stub today; would open the same form as Create with name editable and an "Expires" extension control.
- **Auth** — `Authorization: Bearer <token>` placeholder in the request interceptor; needs a real session store and refresh logic.
- **Virtualization** — current table renders all rows. With 1000+ keys, swap `KeysTable` for `@tanstack/react-virtual`.
- **Server-side pagination / sort / search** — UI affordances and API contract trivially extended.
- **E2E** — Playwright tests for the create-and-copy path.
- **Dark mode** — the design only provides one mode; tokens are already in `tailwind.config.ts` and could swap via a `data-theme` attribute.
- **Real Figma access** — the design system tokens (colors, type ramp, spacing) were eyeballed from a single PNG export. Direct Figma access would let me sync tokens exactly.

## Assumptions

- The "Edit/Disable/Delete" dropdown plus row hover **is** the "interactive row/card" behavior called out in the design note. Clicking the row anywhere opens the same dropdown — no separate detail view, since none is shown in the design.
- Status of an expired key (`expiresAt` in the past) is rendered as `Expired` regardless of the stored `status`; `disabled` is a manual state.
- Balance ($140.20) and avatar (RG) in the top bar are static — there's no API surface for them in scope.
