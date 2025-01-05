import { cn } from "@/lib/utils";

const svgs = {
  arrowRight: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      fill="none"
      stroke="currentColor"
      width="100%"
      height="100%"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  ),
  personProfile: (
    <svg
      width="100%"
      height="100%"
      viewBox="-1.28 -1.28 18.56 18.56"
      xmlns="http://www.w3.org/2000/svg"
      fill="#38bdf8"
      stroke="#38bdf8"
      stroke-width="0.4"
    >
      <g
        id="SVGRepo_bgCarrier"
        stroke-width="0"
        transform="translate(0,0), scale(1)"
      />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          fill-rule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </g>
    </svg>
  ),
} as const;

type Svgs = "arrowRight" | "personProfile";

function IconsCustomSvg({
  svgName,
  heightSize = "20px",
  widthSize = "20px",
  className,
}: {
  svgName: Svgs;
  widthSize?: string;
  heightSize?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(className, "inline-block *:stroke-2")}
      style={{ width: widthSize, height: heightSize }}
    >
      {svgs[svgName]}
    </div>
  );
}

export default IconsCustomSvg;
