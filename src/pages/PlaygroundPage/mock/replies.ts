export const MOCK_REPLIES: string[] = [
  "Here's a strong password suggestion: g7K!2pXr#vQ9zB$nE4mL — long, mixed-case, with symbols and digits.",
  "Try this one: bC4#hP9!wN2&zR6@yX8 — 18 characters, no dictionary words, no repetition.",
  "Consider a passphrase style: corona-rocket-quasar-7! — easier to remember, hard to brute-force.",
  "How about: q$T7vM3#bL9!nK2&xF6@ — fully randomized, resistant to common attacks.",
  'Generated for you: Falcon-Vault-2049!Zinc — memorable, mixed case, includes a year and symbol.',
  "Strong option: 9pQ!mR3#tY7$wN5&kX2@ — 20 characters with 4 symbol classes.",
  'Pro tip — store it in a password manager. Suggestion: aZ#7bK!2pQrM9$nE4xL6.',
];

export function pickRandomReply(): string {
  return MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
}
