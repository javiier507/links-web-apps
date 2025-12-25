"use client";

import { useEffect, useRef, useState } from "react";

import { getRandomPlaceholder } from "@repo/api/utils/placeholder";

interface LinkImageProps {
    imageOriginalUrl: string | null;
    imagePlaceholderUrl: string | null;
    alt: string;
}

export function LinkImage({ imageOriginalUrl, imagePlaceholderUrl, alt }: LinkImageProps) {
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const getImageSrc = () => {
        // Si ya hubo un error, siempre mostrar el fallback
        if (hasError) {
            return "/placeholder/placeholder.png";
        }

        if (imageOriginalUrl) {
            return imageOriginalUrl;
        }

        if (imagePlaceholderUrl) {
            return `/placeholder/thumbnails/${imagePlaceholderUrl}`;
        }

        const ramdomImage = getRandomPlaceholder();
        if (ramdomImage) {
            return `/placeholder/thumbnails/${ramdomImage}`;
        }

        return "/placeholder/placeholder.png";
    };

    const handleImageError = () => {
        // Solo marcar error una vez para evitar bucles infinitos
        if (!hasError) {
            setHasError(true);
        }
    };

    const handleImageLoad = () => {
        // Verificar si la imagen realmente se cargó
        if (imgRef.current && imgRef.current.naturalHeight === 0) {
            setHasError(true);
        }
    };

    useEffect(() => {
        // Verificar si la imagen ya está en cache y falló
        const img = imgRef.current;
        if (img?.complete && img.naturalHeight === 0) {
            setHasError(true);
        }
    }, [imageOriginalUrl, imagePlaceholderUrl]);

    return (
        <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-dark-3">
            <img
                ref={imgRef}
                src={getImageSrc()}
                alt={alt}
                onError={handleImageError}
                onLoad={handleImageLoad}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
