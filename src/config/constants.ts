export const ROUTES = {
  home: '/',
  apiKeys: '/api-keys',
  models: '/models',
  usage: '/usage',
  billing: '/billing',
  playground: '/playground',
  nodeRewards: '/node-rewards',
  settings: '/settings',
  docs: '/docs',
} as const;

export type NavItem = {
  label: string;
  to: string;
  iconSrc: string;
  section: 'platform' | 'node' | 'system';
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Models', to: ROUTES.models, iconSrc: '/sidebar/models.svg', section: 'platform' },
  { label: 'API keys', to: ROUTES.apiKeys, iconSrc: '/sidebar/keys.svg', section: 'platform' },
  { label: 'Usage', to: ROUTES.usage, iconSrc: '/sidebar/usage.svg', section: 'platform' },
  { label: 'Billing', to: ROUTES.billing, iconSrc: '/sidebar/billing.svg', section: 'platform' },
  { label: 'Playground', to: ROUTES.playground, iconSrc: '/sidebar/playground.svg', section: 'platform' },
  { label: 'Node rewards', to: ROUTES.nodeRewards, iconSrc: '/sidebar/wallet.svg', section: 'node' },
  { label: 'Settings', to: ROUTES.settings, iconSrc: '/sidebar/settings.svg', section: 'system' },
  { label: 'Docs', to: ROUTES.docs, iconSrc: '/sidebar/docs.svg', section: 'system' },
];

export const MOBILE_NAV_ITEMS: { label: string; to: string; iconSrc: string; badge?: number }[] = [
  { label: 'Models', to: ROUTES.models, iconSrc: '/sidebar/models.svg' },
  { label: 'API keys', to: ROUTES.apiKeys, iconSrc: '/sidebar/keys.svg' },
  { label: 'Usage', to: ROUTES.usage, iconSrc: '/sidebar/usage.svg' },
  { label: 'Billing', to: ROUTES.billing, iconSrc: '/sidebar/billing.svg', badge: 8 },
  { label: 'Account', to: ROUTES.settings, iconSrc: '/sidebar/settings.svg' },
];

export type ExpiryPreset = { label: string; days: number | null };

export const EXPIRY_PRESETS: ExpiryPreset[] = [
  { label: '7 days', days: 7 },
  { label: '30 days', days: 30 },
  { label: '60 days', days: 60 },
  { label: '90 days', days: 90 },
  { label: 'Never', days: null },
];

export const DEFAULT_EXPIRY_DAYS = 30;

export const API_KEY_NAME_MAX_LENGTH = 64;
