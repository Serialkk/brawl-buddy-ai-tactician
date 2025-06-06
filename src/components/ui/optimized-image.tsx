
import { useState, useEffect, ImgHTMLAttributes, SyntheticEvent } from 'react';
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
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string || fallback);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    if (!src) {
      setImgSrc(fallback);
      setHasError(true);
      return;
    }

    setIsLoaded(false);
    setHasError(false);
    setImgSrc(src as string);
  }, [src, fallback]);

  // Handle image load errors
  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn(`Error loading image: ${imgSrc}`);
    setHasError(true);
    setImgSrc(fallback);
    
    if (onError && typeof onError === 'function') {
      onError(e);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={imgSrc}
        alt={alt || "Image"}
        className={cn(
          "transition-opacity duration-300 ease-in-out w-full h-full object-cover",
          !isLoaded && lowQualitySrc ? "filter blur-sm" : "",
          hasError ? "opacity-70" : "",
        )}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        {...props}
      />
    </div>
  );
}
