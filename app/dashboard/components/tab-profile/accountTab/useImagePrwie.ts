import { useState, useEffect } from 'react';

interface UseImageUploadReturn {
    avatarPreview: string | null;
    handleImageUpload: (file: File) => { fileData: File | null; ok: boolean; error?: string } | null;
}

export const useImageUpload = (imageFile: FileList | null): UseImageUploadReturn => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleImageUpload = (file: File) => {
        if (!(file instanceof File) || !file) return null;

        if (file.size > 1 * 1024 * 1024) {
            return {
                fileData: null,
                ok: false,
                error: "Image size must be less than 1MB"
            };
        }
        return { fileData: file, ok: true };
    };

    useEffect(() => {
        if (!imageFile?.[0] || !(imageFile[0] instanceof File)) return;

        try {
            const urlImage = URL.createObjectURL(imageFile[0]);
            setAvatarPreview(urlImage);

            return () => {
                URL.revokeObjectURL(urlImage);
            };
        } catch (error) {
            console.error('Error creating object URL:', error);
        }
    }, [imageFile]);

    return {
        avatarPreview,
        handleImageUpload,
    };
};