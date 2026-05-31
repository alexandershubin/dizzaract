export type ModeId = 'best' | 'fastest' | 'creative' | 'code' | 'manual';

export type Mode = {
  id: ModeId;
  label: string;
  description: string;
  color: string;
  palette: string[];
  iconSrc: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  modeId?: ModeId;
};

export type Chat = {
  id: string;
  title: string;
  group: 'today' | 'lastMonth';
  active?: boolean;
};
