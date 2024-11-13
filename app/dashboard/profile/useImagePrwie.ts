import { useState, useEffect } from "react";

interface ImageData {
    preview: string | null;
    error: string | null;
}

function useImagePreview(fileInput: (FileList | null), maxSizeMB = 1): ImageData {
    const [imageData, setImageData] = useState<ImageData>({
        preview: null,
        error: null,
    });

    useEffect(() => {
        if (!fileInput || !fileInput[0]) return;

        const file = fileInput[0];
        if (file.size <= maxSizeMB * 1024 * 1024) {
            const fileURL = URL.createObjectURL(file);
            setImageData({
                preview: fileURL,
                error: null,
            });
        } else {
            setImageData({
                preview: null, // حفظ پیش‌نمایش قبلی در صورت خطا
                error: `File size is too large. Please select an image smaller than ${maxSizeMB} MB.`,
            });
        }

        return () => {
            if (fileInput && fileInput[0]) {
                URL.revokeObjectURL(fileInput[0]);
            }
        };
    }, [fileInput, maxSizeMB]);

    return imageData;
}

export default useImagePreview;
