/** One bounded sweep: never reverses while scroll progress increases. */
export function scenePan(progress: number, travel: number) {
  const offset = Math.min(1, Math.max(0, progress)) * Math.max(0, travel);
  return offset === 0 ? 0 : -offset;
}
