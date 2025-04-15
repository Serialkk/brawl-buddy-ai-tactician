
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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
  const [imgSrc, setImgSrc] = useState<string>(lowQualitySrc || fallback);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src as string;
    
    img.onload = () => {
      setImgSrc(src as string);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
      setImgSrc(fallback);
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
          props.className
        )}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
