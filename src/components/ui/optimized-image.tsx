
import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  lowQualitySrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallback = '/placeholder.svg',
  lowQualitySrc,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(lowQualitySrc || src as string || fallback);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setImgSrc(fallback);
      setHasError(true);
      return;
    }

    // Check if the src is a data URL or absolute URL
    const isDataUrl = typeof src === 'string' && src.startsWith('data:');
    const isAbsoluteUrl = typeof src === 'string' && (
      src.startsWith('http') || src.startsWith('https') || src.startsWith('blob:')
    );
    
    // If it's already a data URL or absolute URL, use it directly
    if (isDataUrl || isAbsoluteUrl) {
      setImgSrc(src as string);
      setIsLoaded(true);
      return;
    }

    // For relative URLs, preload the image
    const img = new Image();
    img.src = src as string;
    
    img.onload = () => {
      setImgSrc(src as string);
      setIsLoaded(true);
      setHasError(false);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
      setImgSrc(fallback);
      setHasError(true);
    };

    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallback]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={imgSrc}
        alt={alt || "Image"}
        className={cn(
          "transition-opacity duration-300 ease-in-out",
          !isLoaded && lowQualitySrc ? "filter blur-sm" : "",
          hasError ? "opacity-70" : "",
          className
        )}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
