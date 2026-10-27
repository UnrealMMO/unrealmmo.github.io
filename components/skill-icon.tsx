import type { SVGProps } from "react";

// Original UnrealMMO emblems. Filled silhouettes remain readable at small sizes;
// the dark inlays and pale bevels supply a consistent carved-metal finish.
const emblems = {
  wand: (
    <>
      <path d="m22 106 60-65 9 9-59 65Z" />
      <path d="m83 9 9 18 20 3-15 14 4 20-18-10-18 10 4-20-15-14 20-3Z" />
      <path
        d="m83 20 5 11 12 2-9 9 2 12-10-6-10 6 2-12-9-9 12-2Z"
        fill="#f3dfb0"
      />
      <path d="m25 22 3 9 9 3-9 3-3 9-3-9-9-3 9-3Zm72 61 4 11 11 4-11 4-4 11-4-11-11-4 11-4Z" />
    </>
  ),
  hammer: (
    <>
      <path d="m55 53 15 1-6 61H48Z" />
      <path d="M16 22h69l29 18-10 23-25-8H16Z" />
      <path d="M23 29h55v19H23Z" fill="#f3dfb0" opacity=".5" />
      <path d="m85 22-6 33 25 8 10-23Z" fill="#102b24" opacity=".5" />
    </>
  ),
  eye: (
    <>
      <path d="M64 9C42 18 27 37 25 65L14 88l18-5-8 20 25-9 15 23 15-23 25 9-8-20 18 5-11-23C101 37 86 18 64 9Z" />
      <path
        d="M64 21C47 33 38 46 36 65l13 18 15 12 15-12 13-18C90 46 81 33 64 21Z"
        fill="#102b24"
      />
      <path d="m40 59 18 7-3 6-12-5Zm48 0-18 7 3 6 12-5Z" fill="#f3dfb0" />
      <path d="m48 78 16 7 16-7-16 19Z" opacity=".6" />
      <path
        d="M64 9C42 18 27 37 25 65l11-6c5-19 14-33 28-43Z"
        fill="#fff3d0"
        opacity=".3"
      />
      <path
        d="m79 91 25 12-8-20 18 5-11-23-11-6-8 26ZM43 93l21 24-7-22Z"
        fill="#081b17"
        opacity=".35"
      />
      <path d="m21 109 8-5-2 9-8 6Zm79 3 7-6 3 9-8 5Z" opacity=".65" />
    </>
  ),
  sprout: (
    <>
      <path d="M59 95V72C38 73 21 59 18 40c22-2 39 8 44 24l2-22C77 23 95 22 110 27c-1 21-17 36-39 36v31l16 10 16 1-11 8-23-7-5 13-6-13-23 7-11-8 16-1Z" />
      <path
        d="M27 46c13 4 22 10 30 20-15-4-25-11-30-20Zm75-13C88 40 79 48 73 56c15-3 25-11 29-23Z"
        fill="#fff3d0"
        opacity=".36"
      />
      <path d="m64 8 18 19-18 23-18-23Z" fill="#e5c782" />
      <path d="m64 8-7 19 7 23-18-23Z" fill="#fff2c9" />
      <path d="M64 8v42l18-23Z" fill="#9d7e42" />
      <path
        d="m46 27 11 0 7 23 7-23h11"
        fill="none"
        stroke="#18392c"
        strokeWidth="2"
        opacity=".65"
      />
      <path
        d="m60 92-20 12-16 1 11 8 23-7 6 13V63l-4 12Z"
        fill="#102b24"
        opacity=".28"
      />
      <path d="M83 76c13-6 22-4 28 2-8 11-19 13-30 7Z" />
      <path
        d="m72 92 17-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
    </>
  ),
  pickaxe: (
    <>
      <path d="m44 17 13-8 10 11 34 13 15 21-33-14-21-3-9-8-34 11 16-17Z" />
      <path d="m62 32 9 8-43 73-12 4-3-11Z" />
      <path d="m62 40 3 3-43 67-5 1Z" fill="#fff1c3" opacity=".45" />
      <path
        d="m44 17 13-8 10 11 34 13 15 21-16-12-37-16-9-10-20 9Z"
        fill="#fff1c3"
        opacity=".35"
      />
      <path d="m53 29 9 8 21 3 33 14-33-21-21-5Z" fill="#102b24" opacity=".4" />
      <path d="m75 66 18-9 19 18-4 28-22 15-29-12 3-23Z" />
      <path d="m75 66 10 17 27-8-19-18Z" fill="#fff1c3" opacity=".33" />
      <path d="m85 83 1 35 22-15 4-28Z" fill="#102b24" opacity=".35" />
      <path
        d="m93 62-8 21-11 9 7 12-10 7"
        fill="none"
        stroke="#17362c"
        strokeWidth="4"
        strokeLinejoin="bevel"
      />
      <path d="m111 61 4-6 6 4-3 7Zm-56 50 5 4-5 6-6-4Z" opacity=".7" />
    </>
  ),
  axe: (
    <>
      <path d="m64 18 12 6-42 88-13 6-1-13Z" />
      <path d="m69 22 4 3-45 84-4 2Z" fill="#fff1c3" opacity=".4" />
      <path d="m73 17 17-5c1 18 8 28 26 32-8 18-24 29-43 27l-8-21-11-7 10-22Z" />
      <path
        d="M90 12c1 18 8 28 26 32l-9 12c-20-7-28-21-28-40Z"
        fill="#fff1c3"
        opacity=".38"
      />
      <path
        d="m65 50 8 21c19 2 35-9 43-27-12 14-25 19-39 16l-9-15Z"
        fill="#102b24"
        opacity=".38"
      />
      <path d="m49 15-8 3-4-7-8 10-9-1 1 12-10 4 8 10-5 10 13 5 2 13 12-6 8 6 4-17-6-9 7-13-9-5Z" />
      <path
        d="M36 23 31 66l7 14"
        fill="none"
        stroke="#18392c"
        strokeWidth="3"
      />
      <path
        d="m34 40-10-7m9 19 9-8"
        fill="none"
        stroke="#18392c"
        strokeWidth="2.5"
      />
      <path d="m72 89 29 2 10 16-15 10-37-6Z" opacity=".8" />
      <path
        d="m72 89 12 12 17-10m-17 10 12 16"
        fill="none"
        stroke="#18392c"
        strokeWidth="3"
      />
    </>
  ),
  fish: (
    <>
      <path
        d="M76 21c-7-9-20-9-27-2-8 8-8 20 0 28l5-5c-6-6-6-13-1-18 5-5 12-5 17 1 7 10 0 21-5 29l7 4c10-15 12-27 4-37Z"
        fill="#e5c782"
      />
      <path d="m44 39 12 1-2 14Z" fill="#e5c782" />
      <path d="M96 42C73 39 50 53 39 76L15 67l8 21-6 22 27-16c21 9 48-6 64-31l-10-4 13-6Z" />
      <path
        d="M96 42C73 39 50 53 39 76l5 6c15-22 33-31 52-31Z"
        fill="#fff3d0"
        opacity=".4"
      />
      <path
        d="m44 94-4-10c23 5 41-5 58-25l10 4C92 88 65 103 44 94Z"
        fill="#102b24"
        opacity=".32"
      />
      <path d="m55 57 2-16 20 5m-8 40-1 17 19-23" />
      <path
        d="M84 54c-5 8-6 16-3 22"
        fill="none"
        stroke="#17362c"
        strokeWidth="4"
      />
      <circle cx="94" cy="53" r="3" fill="#102b24" />
      <path d="m55 77 13-10-3 14Z" fill="#17362c" opacity=".55" />
      <path
        d="M40 116c14-9 24 5 37-2s20-7 32-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".65"
      />
    </>
  ),
};

export function SkillIcon({
  name,
  size = 64,
  ...props
}: SVGProps<SVGSVGElement> & { name: string; size?: number | string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {emblems[name as keyof typeof emblems] ?? emblems.eye}
    </svg>
  );
}
