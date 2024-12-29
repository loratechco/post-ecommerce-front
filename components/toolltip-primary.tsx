import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  delay?: number;
  children: ReactNode;
  content: string;
  classNameTooltipContent?: string;
}

export default function TooltipPrimary({
  delay = 0,
  children,
  content,
  classNameTooltipContent,
}: Props) {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={cn("dark px-2 py-1 text-xs", classNameTooltipContent)}
        >
          {content || "This tooltip will be always dark"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
