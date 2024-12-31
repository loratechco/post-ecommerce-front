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
} as const;

type Svgs = "arrowRight";

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
      className={cn(className,'inline-block *:stroke-2')}
      style={{ width: widthSize, height: heightSize }}
    >
      {svgs[svgName]}
    </div>
  );
}

export default IconsCustomSvg;
