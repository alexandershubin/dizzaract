import type { Chat, Message } from '../types';

export const MOCK_CHATS: Chat[] = [
  { id: '1', title: "Nature's Wonders", group: 'today' },
  { id: '2', title: 'Butterfly Secrets', group: 'today', active: true },
  { id: '3', title: 'Cryptography Insights', group: 'today' },
  { id: '4', title: 'Caching Strategies', group: 'today' },
  { id: '5', title: 'Stylish Project Tips', group: 'today' },
  { id: '6', title: 'Performance Boosting Tricks', group: 'today' },
  { id: '7', title: 'Software Settings Guide', group: 'today' },
  { id: '8', title: 'Routing Revolution', group: 'lastMonth' },
  { id: '9', title: 'Rendering Roundtable', group: 'lastMonth' },
  { id: '10', title: 'Caching Conundrums', group: 'lastMonth' },
  { id: '11', title: 'Styling Innovations', group: 'lastMonth' },
  { id: '12', title: 'Performance Boosters', group: 'lastMonth' },
  { id: '13', title: 'Software Settings 101', group: 'lastMonth' },
  { id: '14', title: 'Testing Insights', group: 'lastMonth' },
  { id: '15', title: 'Authentication Essentials', group: 'lastMonth' },
  { id: '16', title: 'Deployment Best Practices', group: 'lastMonth' },
  { id: '17', title: 'System Upgrade Tips', group: 'lastMonth' },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    role: 'user',
    content: 'Come up with strong password that will protect my data.',
  },
];
