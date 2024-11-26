"use client";

import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, forwardRef } from "react";

interface TextareaAutosizeProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    defaultRows?: number;
    maxRows?: number;
}

const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
    ({ defaultRows = 1, maxRows, onChange, className, ...props }, ref) => {

        const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
            const textarea = e.target;
            textarea.style.height = "auto";

            const style = window.getComputedStyle(textarea);
            const borderHeight = parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
            const paddingHeight = parseInt(style.paddingTop) + parseInt(style.paddingBottom);

            const lineHeight = parseInt(style.lineHeight);
            const maxHeight = maxRows ? lineHeight * maxRows + borderHeight + paddingHeight : Infinity;

            const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

            textarea.style.height = `${newHeight}px`;

            onChange?.(e);
        };

        return (
            <Textarea
                ref={ref}
                onChange={handleInput}
                rows={defaultRows}
                className={`min-h-[none] resize-none outline-none focus-visible:outline-none ring-0 focus-visible:ring-0 ${className || ''}`}
                {...props}
            />
        );
    }
);

TextareaAutosize.displayName = "TextareaAutosize";

export { TextareaAutosize }; 