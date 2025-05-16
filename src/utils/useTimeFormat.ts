export function formatMilliseconds(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  const formattedMilliseconds = String(milliseconds)
    .slice(0, 1)
    .padStart(1, '0');
  const formattedSeconds = `${seconds}s${formattedMilliseconds}`;

  return minutes > 0 ? `${minutes}m${formattedSeconds}` : formattedSeconds;
}
