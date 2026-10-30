import {
  Droplets,
  Flame,
  Sparkles,
  Coins,
  ScrollText,
  Wrench,
  Gift,
  BookOpen,
  Gem,
  StickyNote,
} from "lucide-react";
function Bucket() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 9h16l-2 12H6L4 9Z M6 9V7a6 6 0 0 1 12 0v2" />
    </svg>
  );
}
function Stick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m5 20-2-2L18 3l3 3L5 20Z M12 10l4-1 M8 14l1 3" />
    </svg>
  );
}
const icons = {
  water: Droplets,
  flame: Flame,
  rune: Sparkles,
  coins: Coins,
  scroll: ScrollText,
  repair: Wrench,
  gift: Gift,
  book: BookOpen,
  gem: Gem,
  stick: Stick,
  paper: StickyNote,
  bucket: Bucket,
};
export function WikiItemIcon({ icon }: { icon: string }) {
  const Icon = icons[icon as keyof typeof icons] ?? Sparkles;
  return <Icon aria-hidden="true" />;
}
