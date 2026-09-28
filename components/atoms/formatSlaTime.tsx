export function formatSlaTime(minutes: number): string {
  const isOverdue = minutes < 0;
  const absoluteMinutes = Math.abs(minutes);

  const days = Math.floor(absoluteMinutes / (24 * 60));
  const hours = Math.floor((absoluteMinutes % (24 * 60)) / 60);
  const mins = absoluteMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);

  const readableDuration = parts.join(' ');

  return isOverdue ? `${readableDuration} overdue` : `${readableDuration} remaining`;
}
