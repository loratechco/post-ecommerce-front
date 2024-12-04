'use client'
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Custom hook for managing profile image upload and preview
 * @param {Object} props - Input parameters
 * @param {number} props.sizeFile - Maximum allowed file size in megabytes
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.userData - User data containing avatar and name
 * @param {string} props.API_IMG_URL - Base API URL for images
 * @param {boolean} props.thereAvatar - Whether to display the avatar
 * @param {Function} props.fileSubmit - Callback function for file submission
 * @returns {JSX.Element} Input elements and avatar preview
 */
export function useUploadImg({
    sizeFile = 1,
    className,
    userData,
    API_IMG_URL,
    thereAvatar = true,
    fileSubmit
}: {
    sizeFile?: number;
    className?: string;
    userData: any;
    API_IMG_URL: string;
    thereAvatar: true | false;
    fileSubmit: (file: File) => void;
}) {
    const [fileSaver, setFileSaver] = useState<string | File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!fileSaver) return;
        const avatarPreviewUrl = URL.createObjectURL(fileSaver as Blob);
        setAvatarPreview(avatarPreviewUrl);
        return () => {
            URL.revokeObjectURL(avatarPreviewUrl);
        }
    }, [fileSaver]);

    return (
        <>
            <input
                className={cn(
                    "z-10 size-full appearance-none bg-transparent opacity-0 absolute inset-0 cursor-pointer",
                    className
                )}
                type="file"
                accept="image/*"

                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file || !(file instanceof File)) return;

                    if (file.size > sizeFile * 1024 * 1024) {
                        toast({
                            title: "Unsuccessful",
                            description: `Image size must be less than ${sizeFile}MB`,
                            className: "bg-red-300 text-red-950 font-semibold",
                        });
                        e.target.value = '';
                        return;
                    }
                    fileSubmit(file);
                    setFileSaver(file);
                }}
            />
            {thereAvatar && AvatarPreview({ avatarPreview, userData, API_IMG_URL })}
        </>
    );
}

interface AvatarPreviewProps {
    avatarPreview?: string | null;
    userData?: { avatar?: string; name?: string };
    API_IMG_URL?: string;
    className?: string;
    initialAvatar?: string;
}

/**
 * Avatar component with preview support (using shadcn/ui Avatar component)
 * @see https://ui.shadcn.com/docs/components/avatar
 */
export const AvatarPreview = ({
    avatarPreview,
    userData,
    API_IMG_URL,
    className,
    initialAvatar = "https://github.com/shadcn.png"
}: AvatarPreviewProps) => {

    console.log(`${API_IMG_URL} / ${userData?.avatar}`);

    const initialSrc = () => {
        if (!userData?.avatar)
            return initialAvatar;
        return `${API_IMG_URL}/${userData?.avatar}`;
    }

    return (
        <Avatar className={cn("cursor-pointer relative z-0 size-full", className)} >
            <AvatarImage
                src={
                    `${avatarPreview ||
                    initialSrc()
                    }`
                }

                className="object-cover" />
            <AvatarFallback>{
                userData?.name?.slice(0, 2).toUpperCase() || 'Avatar'
            }</AvatarFallback>
        </Avatar >
    )
}

