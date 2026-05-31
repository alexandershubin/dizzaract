import type { Mode, ModeId } from './types';

export const MODES: Record<ModeId, Mode> = {
  best: {
    id: 'best',
    label: 'Best',
    description: 'Synthesizes the best answer from multiple modes',
    color: '#8B5CF6',
    palette: ['#2E1065', '#4C1D95', '#6D28D9', '#8B5CF6', '#A78BFA', '#C4B5FD'],
    iconSrc: '/chat/best.svg',
  },
  fastest: {
    id: 'fastest',
    label: 'Fastest',
    description: 'Lowest latency, high speed',
    color: '#FACC15',
    palette: ['#422006', '#854D0E', '#CA8A04', '#FACC15', '#FDE047', '#FEF08A'],
    iconSrc: '/chat/fast.svg',
  },
  creative: {
    id: 'creative',
    label: 'Creative',
    description: 'High imagination, imaginative',
    color: '#EC4899',
    palette: ['#500724', '#9D174D', '#BE185D', '#EC4899', '#F472B6', '#FBCFE8'],
    iconSrc: '/chat/creative.svg',
  },
  code: {
    id: 'code',
    label: 'Code',
    description: 'Optimized for logic & syntax',
    color: '#22D3EE',
    palette: ['#083344', '#155E75', '#0E7490', '#22D3EE', '#67E8F9', '#A5F3FC'],
    iconSrc: '/chat/code.svg',
  },
  manual: {
    id: 'manual',
    label: 'Manual',
    description: 'Select specific model manually',
    color: '#A3A3A3',
    palette: ['#262626', '#404040', '#525252', '#737373', '#A3A3A3', '#D4D4D4'],
    iconSrc: '/chat/manual.svg',
  },
};

export const MODE_ORDER: ModeId[] = ['best', 'fastest', 'creative', 'code', 'manual'];
