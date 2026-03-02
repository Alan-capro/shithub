const PHILOSOPHY_BANK = [
  "But why though?",
  "If code is unreadable, is it still elegant?",
  "What is merge, really?",
  "Do tests fail, or do they reveal truth?",
];

export function maybeAskPhilosophicalQuestion(): string | null {
  return Math.random() < 0.35
    ? PHILOSOPHY_BANK[Math.floor(Math.random() * PHILOSOPHY_BANK.length)]
    : null;
}

export function calculateRunawayMergePosition(
  mouseX: number,
  mouseY: number,
  buttonX: number,
  buttonY: number,
): { x: number; y: number } {
  const dx = buttonX - mouseX;
  const dy = buttonY - mouseY;
  const distance = Math.hypot(dx, dy) || 1;
  const pushDistance = 46;

  return {
    x: buttonX + (dx / distance) * pushDistance,
    y: buttonY + (dy / distance) * pushDistance,
  };
}

export function randomShithubStatusCode(): number {
  const pool = [418, 599, 500, 502];
  return pool[Math.floor(Math.random() * pool.length)];
}
