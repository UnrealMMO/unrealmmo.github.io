import type { WikiItemIconName } from "@/content/wiki-icons";
export function WikiItemIcon({ icon }: { icon: WikiItemIconName }) {
  return (
    <img
      className="wiki-game-icon"
      src={`/wiki/items/${icon}.png`}
      alt=""
      width={64}
      height={64}
      loading="lazy"
    />
  );
}
