
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
  const [imgSrc, setImgSrc] = useState<string>(lowQualitySrc || fallback);
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
      const img = new Image();
      img.src = src as string;
      
      img.onload = () => {
        setImgSrc(src as string);
        setIsLoaded(true);
        setHasError(false);
      };
      
      img.onerror = (event) => {
        console.warn(`Failed to load image: ${src}`);
        setImgSrc(fallback);
        setHasError(true);
        if (onError && typeof onError === 'function') {
          // Create a synthetic event-like object instead of passing the Error directly
          const syntheticEvent = {
            currentTarget: img,
            target: img,
            preventDefault: () => {},
            stopPropagation: () => {},
            nativeEvent: event,
            bubbles: true,
            cancelable: true,
            defaultPrevented: false,
            type: 'error'
          } as unknown as SyntheticEvent<HTMLImageElement, Event>;
          
          onError(syntheticEvent);
        }
      };

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }

    // For relative URLs, handle differently as they might be local project files
    try {
      // Try importing as a module (for Vite)
      const importedSrc = src;
      setImgSrc(importedSrc as string);
      setIsLoaded(true);
      setHasError(false);
    } catch (error) {
      console.warn(`Failed to load image: ${src}`, error);
      setImgSrc(fallback);
      setHasError(true);
      if (onError && typeof onError === 'function') {
        // Create a synthetic event-like object for better typing
        const imgElement = new Image();
        imgElement.src = src as string;
        
        const syntheticEvent = {
          currentTarget: imgElement,
          target: imgElement,
          preventDefault: () => {},
          stopPropagation: () => {},
          nativeEvent: new Event('error'),
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          type: 'error'
        } as unknown as SyntheticEvent<HTMLImageElement, Event>;
        
        onError(syntheticEvent);
      }
    }
  }, [src, fallback, onError]);

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
        onError={(e) => {
          setHasError(true);
          setImgSrc(fallback);
          if (onError && typeof onError === 'function') {
            onError(e);
          }
        }}
        {...props}
      />
    </div>
  );
}
